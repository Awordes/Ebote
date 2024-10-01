using System.Reflection;
using Ebote.API.Hubs;
using Ebote.Domain;
using Ebote.Infrastructure;
using Ebote.Infrastructure.Settings;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

//Options
builder.Services.Configure<DbSettings>(builder.Configuration.GetSection(DbSettings.SectionName));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => options.LoginPath = "/login");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Ebote API"
    });

    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder.Services.AddSignalR();
builder.Services.AddEboteDomain();

builder.Services.AddInfrastructure(builder.Configuration.GetSection(DbSettings.SectionName).Get<DbSettings>());

builder.Services.AddControllers();

var app = builder.Build();

using var scope = app.Services.CreateScope();

await scope.ServiceProvider.UseUnfrastructure();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
});

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseHttpsRedirection();

app.MapHub<WizardHub>("/wizard");
app.MapControllers();

app.Run();
