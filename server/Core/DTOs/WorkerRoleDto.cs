﻿using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs
{
    public class WorkerRoleDto
    {
    //    public int Id { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public DateTime StartRoleDate { get; set; }


    }
}
