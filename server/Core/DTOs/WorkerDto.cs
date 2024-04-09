using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class WorkerDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime StartOfWork { get; set; }
        public DateTime Birthdate { get; set; }
        public Gender Gender { get; set; }
        public List<WorkerRoleDto> Roles { get; set; }
        public bool Status { get; set; }
    }
}
