using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public interface IWorkerService
    {
        public Task<IEnumerable<Worker>> GetAllWorkersAsync();

        public Task<Worker> GetByIdAsync(int id);

        public Task<Worker> AddAsync(Worker worker);

        public Task<Worker> AddRoleToWorkerAsync(int workerId, WorkerRole workerRole);
        public  Task<Worker> DeleteRoleToWorkerAsync(int workerId, int roleId);

        public Task<Worker> UpdateAsync(int id, Worker value);

        public Task<Worker> ChangeStatusAsync(int id);
    }
}
