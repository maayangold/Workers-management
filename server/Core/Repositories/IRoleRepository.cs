using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IRoleRepository
    {
        Task<IEnumerable<Role>> GetAllRolesAsync();
        Task<Role> GetByIdAsync(int id);
        Task<Role> AddAsync(Role role);
        Task<Role> UpdateAsync(int id, Role role);
    }
}
