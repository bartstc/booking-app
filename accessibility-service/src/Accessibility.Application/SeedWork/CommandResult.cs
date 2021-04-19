namespace Accessibility.Application.SeedWork
{
    public class CommandResult<TResult>
    {
        public CommandResult(bool success, string message)
        {
            Success = success;
            Message = message;
        }

        public CommandResult(bool success, TResult result)
        {
            Success = success;
            Result = result;
        }

        public bool Success { get; }
        public string Message { get; }
        public TResult Result { get; }
    }
}
