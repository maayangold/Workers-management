using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Repositories
{
    public interface IWorkerRepository
    {
        public Task<IEnumerable<Worker>> GetAllWorkersAsync();

        public Task<Worker> GetByIdAsync(int id);

        public Task<Worker> AddAsync(Worker worker);

        public Task<Job[]> AddJobAsync(int id, Job job);

        public Task<Worker> UpdateAsync(int id, Worker value);

        public Task<Worker> ChangeStatusAsync(int id);
    }
}
