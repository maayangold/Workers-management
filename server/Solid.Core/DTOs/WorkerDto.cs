using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class WorkerDto
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string tz { get; set; }
        public DateTime startOfWork { get; set; }
        public DateTime birthdate { get; set; }
        public Gender gender { get; set; }
        public List<Job> jobs { get; set; } = new List<Job>();
        public bool status { get; set; }
    }
}
