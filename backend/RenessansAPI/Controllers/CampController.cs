using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RenessansAPI.Domain.Configurations;
using RenessansAPI.Domain.Enums;
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

    /// <summary>
    /// Get all camps (client-side, returns single language)
    /// Example: /api/AbtCamp/public?lang=English&pageIndex=1&pageSize=10
    /// </summary>
    [HttpGet("public")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAllForClientAsync(
        [FromQuery] PaginationParams @params,
        [FromQuery] Language lang = Language.Uzbek)
    {
        var result = await service.GetAllForClientAsync(@params, lang);
        return Ok(result);
    }

    /// <summary>
    /// Get one camp by Id (client-side, single language)
    /// Example: /api/AbtCamp/public/{id}?lang=Russian
    /// </summary>
    [HttpGet("public/{id:guid}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetByIdForClientAsync(Guid id, [FromQuery] Language lang = Language.Uzbek)
    {
        var result = await service.GetByIdForClientAsync(id, lang);
        return Ok(result);
    }

    // ===========================
    // 🔹 ADMIN ENDPOINTS
    // ===========================

    /// <summary>
    /// Get all camps (admin-side, returns all languages)
    /// Example: /api/AbtCamp/admin?pageIndex=1&pageSize=10
    /// </summary>
    [HttpGet("admin")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> GetAllForAdminAsync([FromQuery] PaginationParams @params)
    {
        var result = await service.GetAllForAdminAsync(@params);
        return Ok(result);
    }

    /// <summary>
    /// Get one camp (admin-side, includes all languages)
    /// </summary>
    [HttpGet("admin/{id:guid}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> GetByIdForAdminAsync(Guid id)
    {
        var result = await service.GetByIdForAdminAsync(id);
        return Ok(result);
    }

    /// <summary>
    /// Create new camp (with optional image upload)
    /// </summary>
    [HttpPost("admin")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> CreateAsync([FromForm] AbtCampForCreationDto dto)
    {
        var result = await service.CreateAsync(dto);

        // ✅ Option 1: simple success
        return Ok(result);

        // ✅ Option 2 (if you want Created response):
        // var url = $"{Request.Scheme}://{Request.Host}/api/AbtCamp/admin/{result.Id}";
        // return Created(url, result);
    }

    /// <summary>
    /// Update existing camp (partial update, supports image upload)
    /// </summary>
    [HttpPatch("admin/{id:guid}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> UpdateAsync(Guid id, [FromForm] AbtCampForUpdateDto dto)
    {
        var result = await service.UpdateAsync(id, dto);
        return Ok(result);
    }

    /// <summary>
    /// Soft delete a camp by Id
    /// </summary>
    [HttpDelete("admin/{id:guid}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        var isDeleted = await service.DeleteAsync(id);
        return Ok(new { success = isDeleted });
    }
}
