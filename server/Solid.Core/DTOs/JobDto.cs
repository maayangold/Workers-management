using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class JobDto
    {
        public int id {  get; set; }
        public Role role { get; set; }
        public DateTime startOfJob { get; set; }
    }
}
