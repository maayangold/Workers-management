using Core.Entities;

namespace server.Models
{
    public class JobPostModel
    {
        public Role role { get; set; }
        public bool managerial { get; set; }
        public DateTime startOfJob { get; set; }
    }
}
