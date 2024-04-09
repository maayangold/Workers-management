using Core.Entities;
using Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;

        public RoleRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Role>> GetAllRolesAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role> GetByIdAsync(int id)
        {
            return await _context.Roles.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Role> AddAsync(Role role)
        {
            // Check if a role with the same name already exists
            var existingRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == role.Name);

            if (existingRole != null)
            {
                // Role with the same name already exists, throw an exception or handle accordingly
                throw new InvalidOperationException("A role with the same name already exists.");
            }

            // Role with a unique name, add it to the database
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }


        public async Task<Role> UpdateAsync(int id, Role role)
        {
            var existingRole = await _context.Roles.FindAsync(id);
            if (existingRole == null)
                return null;

            existingRole.Name = role.Name;
            existingRole.Managerial = role.Managerial;

            await _context.SaveChangesAsync();
            return existingRole;
        }


    }
}
