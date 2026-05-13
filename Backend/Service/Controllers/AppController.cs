using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Service.Data;
using Service.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace Service.Controllers;

[Route("api/apps")]
[ApiController]
[Authorize]
public class AppController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await db.Apps.ToListAsync());
    }
    
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var app = await db.Apps.FindAsync(id);
        return app is null ? NotFound() : Ok(app);
    }
    
    [HttpPost]
    public async Task <IActionResult> Register(RegisteredApp registeredApp)
    {
        bool conflict = await db.Apps.AnyAsync(a => a.Name == registeredApp.Name || a.RoutePrefix == registeredApp.RoutePrefix);
        if (conflict)
        {
            return Conflict(new {message = "Name or RoutePrefix already registered."});
        }
        
        registeredApp.Id = Guid.NewGuid();
        registeredApp.CreatedAt = DateTime.UtcNow;
        await db.Apps.AddAsync(registeredApp);
        await db.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetById), new { id = registeredApp.Id}, registeredApp);
    }
    
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var app = await db.Apps.FindAsync(id);
        if (app is null) return NotFound();
        db.Apps.Remove(app);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
