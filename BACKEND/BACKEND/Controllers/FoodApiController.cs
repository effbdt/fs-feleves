using BACKEND.Services;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{

	[ApiController]
	[Route("[controller]")]
	public class FoodApiController : ControllerBase
	{
		private readonly IFoodService foodService;

		public FoodApiController(IFoodService foodService)
		{
			this.foodService = foodService;
		}

		[HttpGet]
		public IEnumerable<Food> GetFoods()
		{
			return foodService.GetAllFoods();
		}

		[HttpGet("{name}")]
		public Food? GetFood(string name)
		{
			return foodService.GetFood(name);
		}

		[HttpPost]
		public void CreateFood([FromBody] Food food)
		{
			foodService.CreateFood(food);
		}

		[HttpDelete("{name}")]
		public void DeleteFood(string name)
		{
			foodService.DeleteFood(name);
		}

		[HttpGet("priorotized")]
		public IEnumerable<Food> OrderByExprDate()
		{
			return foodService.OrderedByExpiration();
		}

		[HttpGet("suggestions")]
		public IEnumerable<Food> Suggestions()
		{
			return foodService.BuySuggestions();
		}
	}
}
