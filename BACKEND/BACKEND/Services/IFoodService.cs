using BACKEND.Models;

namespace BACKEND.Services
{
	public interface IFoodService
	{
		void CreateFood(Food food);
		void DeleteFood(string food);
		IEnumerable<Food> GetAllFoods();
		Food? GetFood(string food);
		IEnumerable<Food> OrderedByExpiration();
		IEnumerable<Food> BuySuggestions();
	}
}