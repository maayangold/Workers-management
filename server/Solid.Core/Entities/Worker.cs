using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Entities
{
   
        public enum Gender { Male = 1, Female }
    public class Worker
    {
        public static int Counter = 0;
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string tz { get; set; }
        public DateTime startOfWork { get; set; }
        public DateTime birthdate { get; set; }
        public Gender gender { get; set; }
        public List<Job> jobs { get; set; } = new List<Job>();
        public bool status { get; set; }

        public Worker(string firstName, string lastName, string tz, DateTime startOfWork, DateTime birthdate, Gender gender, List<Job> jobs, bool status = true)
        {
            id = ++Counter;
            this.firstName = firstName;
            this.lastName = lastName;
            this.tz = tz;
            this.startOfWork = startOfWork;
            this.birthdate = birthdate;
            this.gender = gender;
            this.jobs = jobs;
            this.status = status;

        }
        public Worker()
        {

            id = ++Counter;
            this.status = true;
        }
    }
}
