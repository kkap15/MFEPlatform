namespace Service.Models;

public class RegisteredApp
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string DisplayName { get; set; }
    public required string ExposedModule { get; set; }
    public required string RemoteUrl { get; set; }
    public required string NgModuleName { get; set; }
    public required string RoutePrefix { get; set; }
    public DateTime CreatedAt { get; set; }
}