using RenessansAPI.Service.IService;

namespace RenessansAPI.Middlewares;

public class TokenValidationMiddleware
{
    private readonly RequestDelegate _next;

    public TokenValidationMiddleware(RequestDelegate _next)
    {
        this._next = _next;
    }

    public async Task InvokeAsync(HttpContext context, ITokenService sessionService)
    {
        var path = context.Request.Path.Value?.ToLower();

        var allowedPaths = new[]
        {
            "/api/auth/login",
            "/api/auth/register",
            "/api/public/health",
            "/api/auth/refreshtoken",
            "/api/camp"

        };

        if (allowedPaths.Contains(path))
        {
            await _next(context);
            return;
        }

        var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();

        if (authHeader != null && authHeader.StartsWith("Bearer "))
        {
            var token = authHeader.Substring("Bearer ".Length).Trim();

            var tokenExists = await sessionService.CheckTokenExistsAsync(token);

            if (!tokenExists)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Unauthorized: Invalid token");
                return;
            }
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Unauthorized: Bearer token required");
            return;
        }

        await _next(context);
    }
}
