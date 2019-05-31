using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TodoApi.Models;

namespace TodoApi {
    public class Startup {
        public void ConfigureServices(IServiceCollection services) {
            services.AddDbContext<TodoContext>(opt => opt.UseInMemoryDatabase("TodoItems"));
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app) {
            app.UseMvc();
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}