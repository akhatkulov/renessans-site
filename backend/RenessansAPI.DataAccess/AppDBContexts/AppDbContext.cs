using Microsoft.EntityFrameworkCore;
using RenessansAPI.Domain.Entities.Auth;
using RenessansAPI.Domain.Entities.News.AboutCamps;
using RenessansAPI.Domain.Entities.Users;

namespace RenessansAPI.DataAccess.AppDBContexts;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    //Auth
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Role> Roles { get; set; }
    public virtual DbSet<Permission> Permissions { get; set; }
    public virtual DbSet<Token> Tokens { get; set; }
    public virtual DbSet<AbtCamp> AbtCamps { get; set; }
}
