using Microsoft.AspNetCore.Http;

namespace RenessansAPI.Service.DTOs.NewsDto.AboutCampsDto;

public class CampForUpdateDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public IFormFile? Image { get; set; }
}
