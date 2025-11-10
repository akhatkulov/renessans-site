using RenessansAPI.Domain.Entities.News.AboutCamps;
using RenessansAPI.Service.DTOs.NewsDto.AboutCampsDto;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using RenessansAPI.Service.Helpers;
using RenessansAPI.Domain.Configurations; // Add this using if PaginationParams is defined here

namespace RenessansAPI.Service.IService;

public interface ICampService
{
    Task<Domain.Configurations.PagedResult<CampForViewDto>> GetAllAsync(
    PaginationParams @params,
    Expression<Func<AbtCamp, bool>> filter = null,
    string[] includes = null);

    Task<CampForViewDto> GetAsync(Expression<Func<AbtCamp, bool>> filter, string[] includes = null);
    Task<CampForViewDto> CreateAsync(CampForCreationDto dto);
    Task<CampForViewDto> UpdateAsync(Guid id, CampForUpdateDto dto);
    Task<bool> DeleteAsync(Expression<Func<AbtCamp, bool>> filter);
}
