using RenessansAPI.Domain.Entities.News.AboutCamps;
using RenessansAPI.Service.DTOs.NewsDto.AboutCampsDto;
using System.Linq.Expressions;

namespace RenessansAPI.Service.IService;

public interface ICampService
{
    Task<IEnumerable<CampForViewDto>> GetAllAsync(Expression<Func<AbtCamp, bool>> filter = null, string[] includes = null);
    Task<CampForViewDto> GetAsync(Expression<Func<AbtCamp, bool>> filter, string[] includes = null);
    Task<CampForViewDto> CreateAsync(CampForCreationDto dto);
    Task<CampForViewDto> UpdateAsync(Guid id, CampForUpdateDto dto);
    Task<bool> DeleteAsync(Expression<Func<AbtCamp, bool>> filter);
}
