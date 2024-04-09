using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Service
{
    public class WorkerService: IWorkerService
    {
        private readonly IWorkerRepository _workerRepository;
        public WorkerService(IWorkerRepository workerRepository)
        {
            _workerRepository = workerRepository;
        }
        public async Task<IEnumerable<Worker>> GetAllWorkersAsync()
        {
            return await _workerRepository.GetAllWorkersAsync();
        }

        public async Task<Worker> GetByIdAsync(int id)
        {
            return await _workerRepository.GetByIdAsync(id);
        }
        public async Task<Worker> AddAsync(Worker worker)
        {

            return await _workerRepository.AddAsync(worker);
        }
        public async Task<Job[]> AddJobAsync(int id,Job job)
        {

            return await _workerRepository.AddJobAsync(id,job);
        }
        public async Task<Worker> UpdateAsync(int id, Worker value)
        {
            return await _workerRepository.UpdateAsync(id,value);

        }

        public async Task<Worker> ChangeStatusAsync(int id)
        {
            return await _workerRepository.ChangeStatusAsync(id);
        }
    }
}
