using BACKEND.Data;
using BACKEND.Services;

namespace BACKEND
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			builder.Services.AddControllers();
			
			builder.Services.AddSingleton<IFoodRepository, FoodRepository>();
			builder.Services.AddSingleton<IFoodService, FoodService>();

			var app = builder.Build();

			app.UseRouting();

			app.UseCors(x => x
			.AllowCredentials()
			.AllowAnyMethod()
			.AllowAnyHeader()
			.WithOrigins("http://127.0.0.1:5500"));

			app.MapControllerRoute(
				name: "default",
				pattern: "{controller}/{action=Index}"
				);

			

			app.Run();
		}
	}
}
