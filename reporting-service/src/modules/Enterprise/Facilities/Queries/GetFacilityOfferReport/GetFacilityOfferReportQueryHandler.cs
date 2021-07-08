using System;
using System.Threading;
using System.Threading.Tasks;
using Core.Queries;
using Enterprise.Facilities.Projections;
using Marten;

namespace Enterprise.Facilities.Queries.GetFacilityOfferReport
{
    public class GetFacilityOfferReportQueryHandler : IQueryHandler<GetFacilityOfferReportQuery, FacilityOfferReport>
    {
        private readonly IDocumentSession documentSession;

        public GetFacilityOfferReportQueryHandler(IDocumentSession documentSession)
        {
            this.documentSession = documentSession;
        }

        public async Task<FacilityOfferReport> Handle(GetFacilityOfferReportQuery request, CancellationToken cancellationToken)
        {
            return await documentSession.Events.AggregateStreamAsync<FacilityOfferReport>(request.FacilityId);
        }
    }
}
