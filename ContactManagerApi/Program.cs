using ContactManagerApi.Data;
using ContactManagerApi.Repositories;
using ContactManagerApi.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;
using Microsoft.OpenApi.Models;
var builder = WebApplication.CreateBuilder(args);

// Starting with allowing our front-end part using CORS.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")  // Allow frontend(In this project it is running on port: 3000)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

//As mentioned, we will be using In-Memory Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("ContactDB"));

//Registering Repositories and Services for contacts
builder.Services.AddScoped<IContactRepository, ContactRepository>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddControllers();

// Adding swagger Configure Swagger(Swagger will gave clarity about API and will add comments on every API's )
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddSwaggerGen(c =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);

    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Contact Manager API",
        Version = "v1",
        Description = "Adding 5 API's for fetching, deleting and updating data."
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();  //Creates the database if not already created
}

//Enabling CORS
app.UseCors("AllowReactApp");

// Enabling Swagger in Development Mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Contact Manager API v1");
        c.RoutePrefix = string.Empty; // Opens at http://localhost:5000
    });
}

//Adding global Middleware to catch Exception.
app.UseMiddleware<ExceptionMiddleware>(); 

app.UseAuthorization();
app.MapControllers();
app.Run();
