using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public enum Role { Secretary = 1, Teacher, Manager, Supervisor }
    public class Job
    {
        public int id { get; set; }
        public Role role { get; set; }
        public bool managerial { get; set; }
        public DateTime startOfJob { get; set; }
        public List<Worker> workers { get; set; }
    }
}
