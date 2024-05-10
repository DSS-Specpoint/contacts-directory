namespace ContactsAPI.MODEL
{
    public class ContactsAPIResponse<T>
    {
        public bool Success { get; set; }
        public T Data { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; }
        public ContactsAPIResponse(T data, string message = null)
        {
            Success = true;
            Data = data;
            Message = message;
        }
        public ContactsAPIResponse(string message)
        {
            Success = false;
            Message = message;
        }
    }
}
