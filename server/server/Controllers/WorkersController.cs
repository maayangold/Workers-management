using AutoMapper;
using AutoMapper.Execution;
using Core.DTOs;
using Core.Entities;
using Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using server.Models;
using Service;
using System.Data;
using WorkerAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkersController : ControllerBase
    {
        private readonly IWorkerService _workerService;
        private readonly IMapper _mapper;
        public WorkersController(IWorkerService workerService, IMapper mapper)
        {
            _workerService = workerService;
            _mapper = mapper;
        }

        // GET: api/<WorkerController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var workers = await _workerService.GetAllWorkersAsync();
            var workersDto = _mapper.Map<IEnumerable<WorkerDto>>(workers);
            return Ok(workersDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var worker = await _workerService.GetByIdAsync(id);
            if (worker == null)
                return NotFound();
            var workerDto = _mapper.Map<WorkerDto>(worker);
            return Ok(workerDto);
        }

        // POST: api/workers
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] WorkerPostModel worker)
        {
            try
            {
                var workerToAdd = _mapper.Map<Worker>(worker);
                var newworker = await _workerService.AddAsync(workerToAdd);
                var workerDto = _mapper.Map<WorkerDto>(newworker);
                return Ok(workerDto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //// PUT: api/workers/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] WorkerPostModel worker)
        {
            try
            {
                var workerToUpdate = _mapper.Map<Worker>(worker);
                var newworker = await _workerService.UpdateAsync(id, workerToUpdate);
                if (newworker == null)
                    return NotFound();

                var workerDto = _mapper.Map<WorkerDto>(newworker);

                return Ok(workerDto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{workerId}/Role")]
        public async Task<ActionResult> AddRoleToWorker(int workerId, [FromBody] RoleWorkerPostModel roleToWorker)
        {
            try
            {
                // Map RoleWorkerPostModel to WorkerRole
                var workerRole = _mapper.Map<WorkerRole>(roleToWorker);
                workerRole.WorkerId = workerId; // Set workerId
                var updatedWorker = await _workerService.AddRoleToWorkerAsync(workerId, workerRole);
                var workerDto = _mapper.Map<WorkerDto>(updatedWorker);

                return Ok(workerRole);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{workerId}/{roleId}")]
        public async Task<ActionResult> DeleteRoleToWorker(int workerId, int roleId)
        {
            try
            {

                var updatedWorker = await _workerService.DeleteRoleToWorkerAsync(workerId, roleId);
                var workerDto = _mapper.Map<WorkerDto>(updatedWorker);

                return Ok(workerDto);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}/status")]
        public async Task<ActionResult> PutStatus(int id)
        {
            var workerToUpdateS = await _workerService.ChangeStatusAsync(id);
            if (workerToUpdateS == null)
                return NotFound();
            var workerDto = _mapper.Map<WorkerDto>(workerToUpdateS);

            return Ok(workerDto);

        }



    }
}

