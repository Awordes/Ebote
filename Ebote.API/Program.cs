using Ebote.API.Hubs;
using Ebote.Domain;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddEboteDomain();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapHub<WizardHub>("/wizard");
app.MapGet("/hi", () => "Hello World!");

app.Run();
