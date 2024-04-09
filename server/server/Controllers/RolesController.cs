using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using Solid.Service;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace roleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RolesController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }
        // GET: api/<RolesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var roles = await _roleService.GetAllRolesAsync();
            var rolesDto = _mapper.Map<IEnumerable<RoleDto>>(roles);
            return Ok(rolesDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role == null)
                return NotFound();
            var roleDto = _mapper.Map<RoleDto>(role);
            return Ok(roleDto);
        }

        // POST api/<RolesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RolePostModel role)
        {
            try
            {
                var roleToAdd = _mapper.Map<Role>(role);
            var newrole = await _roleService.AddAsync(roleToAdd);
            var roleDto = _mapper.Map<RoleDto>(newrole);
            return Ok(roleDto);
            }
            catch (InvalidOperationException ex)
            {
                // Return a conflict response if a role with the same name already exists
                return Conflict(ex.Message);
            }
        }

        // PUT api/<RolesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel role)
        {

            var roleToUpdate = _mapper.Map<Role>(role);
            var newrole = await _roleService.UpdateAsync(id, roleToUpdate);
            if (newrole == null)
                return NotFound();

            var roleDto = _mapper.Map<RoleDto>(newrole);

            return Ok(roleDto);
        }



    }
}
