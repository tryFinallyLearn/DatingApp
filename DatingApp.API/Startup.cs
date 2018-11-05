using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using AutoMapper;

namespace DatingApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt => opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc()
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(Options =>
                {
                    Options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });
            services.AddCors(x =>
            {
                x.AddPolicy("myCorsPolicy", p =>
                 {
                     p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                 });
            });
            services.AddAutoMapper();
            services.AddTransient<Seed>();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IDatingRepository, DatingRepository>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.ASCII.GetBytes(
                                Configuration.GetSection("Appsettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app,
         IHostingEnvironment env,
         Seed seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // app.UseHsts();
            }
            // seeder.SeedUsers();
            app.UseCors("myCorsPolicy");
            app.UseAuthentication();
            // app.UseHttpsRedirection();
            app.UseMvcWithDefaultRoute();
        }
    }
}
