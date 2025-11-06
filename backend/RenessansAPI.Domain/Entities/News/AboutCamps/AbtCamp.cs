using RenessansAPI.Domain.Common;

namespace RenessansAPI.Domain.Entities.News.AboutCamps;

public class AbtCamp : Auditable
{
    public string? Title { get; set; }
    public string Description { get; set; }
    public string? ImagePath { get; set; }
}
