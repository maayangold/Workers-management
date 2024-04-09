using Core.Entities;
using Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Data.Repositories
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
            return await _context.Workers.Include(worker => worker.Roles).ThenInclude(role => role.Role).ToListAsync();
        }

        public async Task<Worker> GetByIdAsync(int id)
        {
            return await _context.Workers.Include(worker => worker.Roles).ThenInclude(role => role.Role).FirstAsync(b => b.Id == id);
        }

        public async Task<Worker> AddAsync(Worker worker)
        {
            var existingWorker = await _context.Workers.FirstOrDefaultAsync(w => w.Identity == worker.Identity);

            if (existingWorker != null)
            {
                // Identity already exists, throw an exception or handle accordingly
                throw new InvalidOperationException("A worker with the same identity already exists.");
            }
            // Validate birthdate against startOfWork date
            if (worker.StartOfWork.Subtract(worker.Birthdate).TotalDays < 365 * 18)
            {
                throw new ArgumentException("Worker must be at least 18 years old.");
            }
            _context.Workers.Add(worker);
            await _context.SaveChangesAsync();
            return worker;
        }

        public async Task<Worker> AddRoleToWorkerAsync(int workerId, WorkerRole roleToWorker)
        {
            var worker = await GetByIdAsync(workerId);
            if (worker == null)
            {
                throw new ArgumentException("Worker not found.", nameof(workerId));
            }

            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Id == roleToWorker.RoleId);
            if (role == null)
            {
                throw new ArgumentException("Role not found.", nameof(roleToWorker.RoleId));
            }

            // Validate startRoleDate against startOfWork date
            if (roleToWorker.StartRoleDate < worker.StartOfWork)
            {
                throw new ArgumentException("Start role date cannot be before the start of work date.", nameof(roleToWorker.StartRoleDate));
            }

            var existingWorkerRole = await _context.WorkerRoles.FirstOrDefaultAsync(wr => wr.WorkerId == workerId && wr.RoleId == roleToWorker.RoleId);
            if (existingWorkerRole != null)
            {
                throw new InvalidOperationException("Role already exists for this worker.");
            }

            var workerRole = new WorkerRole
            {
                WorkerId = workerId,
                RoleId = roleToWorker.RoleId,
                StartRoleDate = roleToWorker.StartRoleDate
            };

            _context.WorkerRoles.Add(workerRole);

            worker.Roles.Add(workerRole); // Assuming Worker entity has a collection of roles
            await _context.SaveChangesAsync(); // Save changes to the database

            return worker;
        }


        public async Task<Worker> DeleteRoleToWorkerAsync(int workerId, int roleId)
        {
            var worker = await GetByIdAsync(workerId);
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Id == roleId);

            if (worker == null)
            {
                throw new ArgumentException("Worker not found.", nameof(workerId));
            }

            if (role == null)
            {
                throw new ArgumentException("Role not found.");
            }

            var existingWorkerRole = await _context.WorkerRoles
                .FirstOrDefaultAsync(wr => wr.WorkerId == workerId && wr.RoleId == roleId);

            if (existingWorkerRole != null)
            {
                _context.WorkerRoles.Remove(existingWorkerRole);
                await _context.SaveChangesAsync();
            }


            return  await GetByIdAsync(workerId); ;
        }
        
        public async Task<Worker> UpdateAsync(int id, Worker value)
        {
            Worker worker = await _context.Workers.FirstAsync(b => b.Id == id);
            if (worker != null)
            {
                // Validate startOfWork against birthdate
                if ((DateTime.Today - value.Birthdate).TotalDays < (18 * 365))
                {
                    throw new ArgumentException("Worker must be at least 18 years old.");
                }
                // Update worker properties from the provided data
                worker.FirstName = value.FirstName;
                worker.LastName = value.LastName;
                worker.Identity = value.Identity;
                worker.StartOfWork = value.StartOfWork;
                worker.Birthdate = value.Birthdate;
                worker.Gender = value.Gender;
                worker.Status = value.Status;

            }
            await _context.SaveChangesAsync();
            return worker;
        }

        public async Task<Worker> ChangeStatusAsync(int id)
        {
            Worker worker = await _context.Workers.FirstAsync(b => b.Id == id);
            worker.Status = !worker.Status;
            await _context.SaveChangesAsync();
            return worker;
        }

       
    }
}
