namespace RenessansAPI.Service.DTOs.NewsDto.AboutCampsDto;

public class CampForViewDto
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string Description { get; set; }
    public string ImagePath { get; set; } = string.Empty;
}
