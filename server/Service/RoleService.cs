using Core.Entities;
using Core.Repositories;
using Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<IEnumerable<Role>> GetAllRolesAsync()
        {
            return await _roleRepository.GetAllRolesAsync();
        }

        public async Task<Role> GetByIdAsync(int id)
        {
            return await _roleRepository.GetByIdAsync(id);
        }
        public async Task<Role> AddAsync(Role role)
        {
            return await _roleRepository.AddAsync(role);
        }

        public async Task<Role> UpdateAsync(int id, Role role)
        {
            return await _roleRepository.UpdateAsync(id ,role);
        }


    }
}
