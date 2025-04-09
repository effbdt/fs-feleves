using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{

	[ApiController]
	[Route("[controller]")]
	public class FoodApiController : ControllerBase
	{
		IFoodRepository _repo;

		public FoodApiController(IFoodRepository repo)
		{
			_repo = repo;
		}

		[HttpGet]
		public IEnumerable<Food> GetFoods()
		{
			return _repo.ReadAll();
		}

		[HttpGet("{name}")]
		public Food? GetFood(string name)
		{
			return _repo.Read(name);
		}

		[HttpPost]
		public void CreateFood([FromBody] Food food)
		{
			_repo.Create(food);
		}

		[HttpDelete("{name}")]
		public void DeleteFood(string name)
		{
			_repo.Delete(name);
		}
	}


}
