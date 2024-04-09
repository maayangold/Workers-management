using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class WorkerRepository : IWorkerRepository
    {
        private readonly DataContext _context;
        public WorkerRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Worker>> GetAllWorkersAsync()
        {
            return await _context.Workers.ToListAsync();
        }

        public async Task<Worker> GetByIdAsync(int id)
        {
            return await _context.Workers.FirstAsync(b => b.id == id);
        }
        public async Task<Worker> AddAsync(Worker worker)
        {
            _context.Workers.Add(worker);
            await _context.SaveChangesAsync();
            return worker;
        }
        public async Task<Job[]> AddJobAsync(int id, Job job)
        {
            Worker worker = await _context.Workers.FirstAsync(b => b.id == id);
            if (worker != null)
            {
                worker.jobs.Add(job);
            }
            await _context.SaveChangesAsync();
            return worker.jobs.ToArray();
        }
        public async Task<Worker> UpdateAsync(int id, Worker value)
        {
            Worker worker = await _context.Workers.FirstAsync(b => b.id == id);
            if (worker != null)
            {
                // Update worker properties from the provided data
                worker.firstName = value.firstName;
                worker.lastName = value.lastName;
                worker.tz = value.tz;
                worker.startOfWork = value.startOfWork;
                worker.birthdate = value.birthdate;
                worker.gender = value.gender;

            }
            await _context.SaveChangesAsync();
            return worker;
        }

        public async Task<Worker> ChangeStatusAsync(int id)
        {
            Worker worker = await _context.Workers.FirstAsync(b => b.id == id);
            worker.status = !worker.status;
            await _context.SaveChangesAsync();
            return worker;
        }

    }
}
