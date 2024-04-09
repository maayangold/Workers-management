using Core.Entities;
using WorkerAPI.Models;

namespace server.Models
{
    public class WorkerPostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime StartOfWork { get; set; }
        public DateTime Birthdate { get; set; }
        public Gender Gender { get; set; }

        public List<RoleWorkerPostModel> Roles { get; set; }
        public bool Status { get; set; }

    }
}
