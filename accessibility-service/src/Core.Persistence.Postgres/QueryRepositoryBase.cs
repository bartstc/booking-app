using System.Data;
using System.Threading.Tasks;
using Core.Database;
using Core.Queries;
using Dapper;
using SqlKata;
using SqlKata.Compilers;

namespace Core.Persistence.Postgres
{
    public abstract class QueryRepositoryBase
    {
        private PostgresCompiler queryCompiler;

        public QueryRepositoryBase(
            ISqlConnectionFactory sqlConnectionFactory)
        {
            Connection = sqlConnectionFactory.GetConnection();
        }

        protected IDbConnection Connection { get; }
        protected Compiler QueryCompiler => queryCompiler ??= new PostgresCompiler();

        protected async Task<QueryCollectionResult<TResult>> GetCollectionResultAsync<TResult>(
            Query query,
            QueryParams queryParams
        )
        {
            var dynamicParameters = new DynamicParameters();
            var countSqlResult = QueryCompiler.Compile(query.Clone().AsCount());

            query.Limit(queryParams.Limit).Offset(queryParams.Offset);
            var sqlResult = queryCompiler.Compile(query);
            
            var fullSql = $"{sqlResult.Sql}; {countSqlResult.Sql};";
            
            foreach (var binding in sqlResult.NamedBindings)
            {
                dynamicParameters.Add(binding.Key, binding.Value);
            }

            using (var multi = await Connection.QueryMultipleAsync(fullSql, dynamicParameters))
            {
                return new QueryCollectionResult<TResult>(
                    await multi.ReadAsync<TResult>(),
                    await multi.ReadFirstAsync<long>(),
                    queryParams.Limit,
                    queryParams.Offset
                );
            }
        }
    }
}
