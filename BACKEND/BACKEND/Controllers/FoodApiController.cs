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
		public IActionResult CreateFood([FromBody] Food food)
		{
			try
			{
				foodService.CreateFood(food);
				return Ok();
			}
			catch (FoodAlreadyExistsException ex)
			{
				return Conflict(ex.Message);
			}
			catch (Exception)
			{
				return BadRequest("Hiba történt az élelmiszer hozzáadása közben!");
			}
		}

		[HttpDelete("{name}")]
		public IActionResult DeleteFood(string name)
		{
			foodService.DeleteFood(name);
			return Ok();
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

		[HttpGet("estimation")]
		public IEnumerable<double> MonthlyEstimation()
		{
			return foodService.MonthlyEstimation();
		}

	}
}
