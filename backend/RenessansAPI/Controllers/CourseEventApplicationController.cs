using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RenessansAPI.Domain.Configurations;
using RenessansAPI.Domain.Entities.News.CoursesEvents;
using RenessansAPI.Service.DTOs.NewsDto.CourseEventApplicationsDto;
using RenessansAPI.Service.Helpers;
using RenessansAPI.Service.IService;
using System.Linq.Expressions;

namespace RenessansAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseEventApplicationController : ControllerBase
{
    private readonly ICourseEventApplicationService _service;

    public CourseEventApplicationController(ICourseEventApplicationService service)
    {
        _service = service;
    }

    // Public apply
    [HttpPost("apply")]
    [AllowAnonymous]
    public async Task<IActionResult> Apply([FromBody] CourseEventApplicationForCreationDto dto)
    {
        var ip = HttpContext.Connection.RemoteIpAddress?.ToString();
        var res = await _service.CreateAsync(dto, ip);
        return Ok(res);
    }

    // Admin: get paged apps
    [HttpGet("admin")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> GetAllAdmin([FromQuery] PaginationParams @params, [FromQuery] bool? isHandled = null, [FromQuery] Guid? eventId = null, [FromQuery] string? q = null)
    {
        Expression<Func<CourseEventApplication, bool>> filter = a => true;
        if (isHandled.HasValue) filter = a => a.IsHandled == isHandled.Value;
        if (eventId.HasValue) filter = a => a.CourseEventId == eventId.Value;
        if (!string.IsNullOrWhiteSpace(q))
        {
            var query = q.Trim();
            filter = a => a.FullName.Contains(query) || a.PhoneNumber.Contains(query);
        }

        var res = await _service.GetAllAdminAsync(@params, filter);
        return Ok(res);
    }

    [HttpGet("admin/{id:guid}")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> GetByIdAdmin(Guid id)
    {
        var res = await _service.GetByIdAdminAsync(id);
        return Ok(res);
    }

    [HttpPatch("admin/{id:guid}/handle")]
    [Authorize(Roles = "Admin,SuperAdmin")]
    public async Task<IActionResult> MarkHandled(Guid id, [FromBody] MarkHandledDto dto)
    {
        var adminUserId = HttpContextHelper.UserId; // or get from token
        var success = await _service.MarkHandledAsync(id, adminUserId ?? Guid.Empty, dto?.AdminNote);
        return Ok(new { success });
    }
}

public class MarkHandledDto { public string? AdminNote { get; set; } }

