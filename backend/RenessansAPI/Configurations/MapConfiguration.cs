using AutoMapper;
using RenessansAPI.Domain.Entities.Auth;
using RenessansAPI.Domain.Entities.News.AboutCamps;
using RenessansAPI.Domain.Entities.Users;
using RenessansAPI.Service.DTOs.NewsDto.AboutCampsDto;
using RenessansAPI.Service.DTOs.PermissionsDto;
using RenessansAPI.Service.DTOs.RolesDto;
using RenessansAPI.Service.DTOs.TokensDto;
using RenessansAPI.Service.DTOs.UsersDto;

namespace RenessansAPI.Configurations;

public class MapConfiguration : Profile
{
    public MapConfiguration()
    {
        //Users
        CreateMap<UserForCreationDto, User>().ReverseMap();
        CreateMap<UserForUpdateDto, User>().ReverseMap();
        CreateMap<UserForViewDto, User>().ReverseMap();

        //Permissions
        CreateMap<PermissionForCreationDto, Permission>().ReverseMap();
        CreateMap<PermissionForUpdateDto, Permission>().ReverseMap();
        CreateMap<string, PermissionForViewDto>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src));
        CreateMap<PermissionForViewDto, Permission>().ReverseMap();



        //Roles
        CreateMap<RoleForCreationDto, Role>().ReverseMap();
        CreateMap<RoleForUpdateDto, Role>().ReverseMap();
        CreateMap<Role, RoleForViewDto>()
            .ForMember(d => d.Permissions, opt => opt.MapFrom(s =>
                (s.Permissions ?? new List<Permission>())
                .Select(p => p.Name)
                .ToList()
            ));
        CreateMap<RoleForViewGetDto, Role>().ReverseMap();

        //Token
        CreateMap<TokenForCreationDto, Token>().ReverseMap();
        CreateMap<TokenForUpdateDto, Token>().ReverseMap();
        CreateMap<TokenForViewDto, Token>().ReverseMap();

        //AboutCamp
        CreateMap<CampForCreationDto, AbtCamp>().ReverseMap();
        CreateMap<CampForUpdateDto, AbtCamp>().ReverseMap();
        CreateMap<CampForViewDto, AbtCamp>().ReverseMap();

    }
}
