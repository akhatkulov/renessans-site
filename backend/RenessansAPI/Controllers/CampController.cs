using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RenessansAPI.Domain.Configurations;
using RenessansAPI.Service.DTOs.NewsDto.AboutCampsDto;
using RenessansAPI.Service.IService;
using RenessansAPI.Service.Service;

namespace RenessansAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CampController : ControllerBase
{
    private readonly ICampService service;

    public CampController(ICampService service)
    {
        this.service = service;
    }

    [HttpGet]
    [AllowAnonymous]
    public async ValueTask<IActionResult> GetAllAsync([FromQuery] PaginationParams @params)
        => Ok(await service.GetAllAsync(@params));

    // GET: api/Course/{id}
    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetByIdAsync(Guid id)
    {
        var result = await service.GetAsync(c => c.Id == id);
        return Ok(result);
    }

    // POST: api/Course
    [HttpPost]
    [Authorize(Roles = "Admin, SuperAdmin")]
    public async Task<IActionResult> CreateAsync([FromForm] CampForCreationDto dto)
    {
        var result = await service.CreateAsync(dto);
        return Ok(result);
    }


    // PUT: api/Course/{id}
    [HttpPatch("{id:guid}")]
    [Authorize(Roles = "Admin, SuperAdmin")]
    public async Task<IActionResult> UpdateAsync(Guid id, [FromForm] CampForUpdateDto dto)
    {
        var result = await service.UpdateAsync(id, dto);
        return Ok(result);
    }


    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin, SuperAdmin")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        var isDeleted = await service.DeleteAsync(c => c.Id == id);
        return Ok(isDeleted);
    }
}
