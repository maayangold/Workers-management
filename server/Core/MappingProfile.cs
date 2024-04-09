using AutoMapper;
using Core.DTOs;
using Core.Entities;
using System.Collections.Generic;

namespace Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Worker, WorkerDto>();
            CreateMap<Role, RoleDto>().ReverseMap();
            CreateMap<WorkerRole, WorkerRoleDto>().ReverseMap();
        }
    }
}
