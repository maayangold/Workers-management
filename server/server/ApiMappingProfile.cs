using AutoMapper;
using AutoMapper.Execution;
using server.Models;
using Core.Entities;
using WorkerAPI.Models;


namespace server
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<WorkerPostModel, Worker>().ReverseMap();
            CreateMap<RolePostModel, Role>().ReverseMap();
            CreateMap<RoleWorkerPostModel, WorkerRole>().ReverseMap();

        }
    }
}