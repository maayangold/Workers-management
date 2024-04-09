using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class JobDto
    {
        public int id {  get; set; }
        public  string role { get; set; }
        public bool managerial { get; set; }      
        public DateTime startOfJob { get; set; }
    }
}
