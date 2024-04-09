using Core.DTOs;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
   
        public enum Gender { Male = 1, Female }
    public class Worker
    {

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime StartOfWork { get; set; }
        public DateTime Birthdate { get; set; }
        public Gender Gender { get; set; }
        public List<WorkerRole> Roles { get; set; }    
        public bool Status { get; set; }

 

    }
}
