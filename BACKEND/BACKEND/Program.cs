namespace BACKEND
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			var app = builder.Build();

			app.UseRouting();

			app.MapControllerRoute(
				name: "default",
				pattern: "{controller}/{action=Index}"
				);

			app.UseCors(x => x
			.AllowCredentials()
			.AllowAnyMethod()
			.AllowAnyHeader()
			.WithOrigins("http://127.0.0.1:5500/"));

			app.Run();
		}
	}
}
