using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data
{
    public class DataContext:DbContext
    {
        public DbSet<Worker> Workers { get; set; }
                    
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=workers_db");
        }

    }
}
