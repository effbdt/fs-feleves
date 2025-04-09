using BACKEND.Data;
using BACKEND.Models;

namespace BACKEND.Services
{
	public class FoodService : IFoodService
	{
		private readonly IFoodRepository _repo;

		public FoodService(IFoodRepository _repo)
		{
			this._repo = _repo;
		}

		public void CreateFood(Food food)
		{
			_repo.Create(food);
		}

		public Food? GetFood(string food)
		{
			return _repo.Read(food);
		}

		public IEnumerable<Food> GetAllFoods()
		{
			return _repo.ReadAll();
		}

		public void DeleteFood(string food)
		{
			_repo.Delete(food);
		}

		public IEnumerable<Food> OrderedByExpiration()
		{
			var foodList = _repo.ReadAll();

			return foodList.OrderBy(f => f.ExpirationDate);
		}
	}
}
