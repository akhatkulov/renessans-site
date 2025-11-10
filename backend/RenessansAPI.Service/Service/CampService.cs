using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RenessansAPI.DataAccess.IRepository;
using RenessansAPI.Domain.Configurations;
using RenessansAPI.Domain.Entities.News.AboutCamps;
using RenessansAPI.Service.DTOs.NewsDto.AboutCampsDto;
using RenessansAPI.Service.Exceptions;
using RenessansAPI.Service.Extensions;
using RenessansAPI.Service.Helpers;
using RenessansAPI.Service.IService;
using System.Linq.Expressions;

namespace RenessansAPI.Service.Service;

public class CampService : ICampService
{
    private readonly IGenericRepository<AbtCamp> repository;
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly IMapper mapper;

    public CampService(IGenericRepository<AbtCamp> repository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    {
        this.repository = repository;
        this.mapper = mapper;
        this.httpContextAccessor = httpContextAccessor;
    }

    public async Task<PagedResult<CampForViewDto>> GetAllAsync(
    PaginationParams @params,
    Expression<Func<AbtCamp, bool>> filter = null,
    string[] includes = null)
    {
        // Combine filter with IsDeleted = false
        Expression<Func<AbtCamp, bool>> finalFilter = x => !x.IsDeleted;
        if (filter != null)
        {
            var param = Expression.Parameter(typeof(AbtCamp));
            var body = Expression.AndAlso(
                Expression.Invoke(filter, param),
                Expression.Invoke(finalFilter, param)
            );
            finalFilter = Expression.Lambda<Func<AbtCamp, bool>>(body, param);
        }

        // Query from repository with pagination
        var query = repository.GetAll(finalFilter, includes);
        var pagedEntities = await query.ToPagedListAsync(@params);

        // Map entities to DTOs
        var mapped = mapper.Map<List<CampForViewDto>>(pagedEntities.Data)
                           .OrderBy(x => x.Id)
                           .ToList();

        // Update image paths
        foreach (var camp in mapped)
        {
            if (!string.IsNullOrEmpty(camp.ImagePath))
            {
                camp.ImagePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://" +
                                 $"{httpContextAccessor.HttpContext.Request.Host}/{camp.ImagePath}";
            }
        }

        // Build paged result
        PagedResult<CampForViewDto> result = new PagedResult<CampForViewDto>()
        {
            Data = mapped,
            TotalItems = pagedEntities.TotalItems,
            TotalPages = pagedEntities.TotalPages,
            CurrentPage = pagedEntities.CurrentPage,
            PageSize = pagedEntities.PageSize
        };

        return result;
    }


    public async Task<CampForViewDto> GetAsync(Expression<Func<AbtCamp, bool>> filter, string[] includes = null)
    {
        var combinedFilter = filter;
        Expression<Func<AbtCamp, bool>> notDeletedFilter = x => !x.IsDeleted;

        if (filter != null)
        {
            var param = Expression.Parameter(typeof(AbtCamp));
            var body = Expression.AndAlso(
                Expression.Invoke(filter, param),
                Expression.Invoke(notDeletedFilter, param)
            );
            combinedFilter = Expression.Lambda<Func<AbtCamp, bool>>(body, param);
        }
        else
        {
            combinedFilter = notDeletedFilter;
        }

        var camp = await repository.GetAsync(combinedFilter, includes);
        if (camp == null)
            throw new HttpStatusCodeException(404, "Camp not found");

        var result = mapper.Map<CampForViewDto>(camp);
        if (!string.IsNullOrEmpty(result.ImagePath))
        {
            result.ImagePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://" +
                               $"{httpContextAccessor.HttpContext.Request.Host}/{result.ImagePath}";
        }

        return result;
    }

    public async Task<CampForViewDto> CreateAsync(CampForCreationDto dto)
    {
        string? relativePath = null;

        if (dto.Image != null && dto.Image.Length > 0)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
            var filePath = Path.Combine("wwwroot/images/camp", fileName);
            Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

            using var stream = new FileStream(filePath, FileMode.Create);
            await dto.Image.CopyToAsync(stream);

            relativePath = $"images/camp/{fileName}";
        }

        var entity = mapper.Map<AbtCamp>(dto);
        entity.ImagePath = relativePath;
        entity.CreatedAt = DateTime.UtcNow;
        entity.CreatedBy = HttpContextHelper.UserId;
        entity.IsDeleted = false;

        await repository.CreateAsync(entity);
        await repository.SaveChangesAsync();

        var result = mapper.Map<CampForViewDto>(entity);
        if (!string.IsNullOrEmpty(result.ImagePath))
        {
            result.ImagePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://" +
                               $"{httpContextAccessor.HttpContext.Request.Host}/{result.ImagePath}";
        }

        return result;
    }

    public async Task<CampForViewDto> UpdateAsync(Guid id, CampForUpdateDto dto)
    {
        var camp = await repository.GetAsync(c => c.Id == id && !c.IsDeleted)
            ?? throw new HttpStatusCodeException(404, "Camp not found");

        if (!string.IsNullOrWhiteSpace(dto.Title))
            camp.Title = dto.Title;

        if (!string.IsNullOrWhiteSpace(dto.Description))
            camp.Description = dto.Description;

        if (dto.Image != null && dto.Image.Length > 0)
        {
            if (!string.IsNullOrEmpty(camp.ImagePath))
            {
                var oldFilePath = Path.Combine("wwwroot", camp.ImagePath);
                if (File.Exists(oldFilePath))
                    File.Delete(oldFilePath);
            }

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(dto.Image.FileName)}";
            var filePath = Path.Combine("wwwroot/images/camp", fileName);
            Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

            using var stream = new FileStream(filePath, FileMode.Create);
            await dto.Image.CopyToAsync(stream);

            camp.ImagePath = $"images/camp/{fileName}";
        }

        camp.UpdatedAt = DateTime.UtcNow;
        camp.UpdatedBy = HttpContextHelper.UserId;

        repository.Update(camp);
        await repository.SaveChangesAsync();

        var result = mapper.Map<CampForViewDto>(camp);
        if (!string.IsNullOrEmpty(result.ImagePath))
        {
            result.ImagePath = $"{httpContextAccessor.HttpContext.Request.Scheme}://" +
                               $"{httpContextAccessor.HttpContext.Request.Host}/{result.ImagePath}";
        }

        return result;
    }

    public async Task<bool> DeleteAsync(Expression<Func<AbtCamp, bool>> filter)
    {
        var camp = await repository.GetAsync(filter);
        if (camp == null)
            throw new HttpStatusCodeException(404, "Camp not found");

        // Soft delete
        camp.IsDeleted = true;
        camp.DeletedBy = HttpContextHelper.UserId;
        camp.DeletedAt = DateTime.UtcNow;

        repository.Update(camp);
        await repository.SaveChangesAsync();

        return true;
    }
}
