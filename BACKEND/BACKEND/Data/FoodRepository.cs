using BACKEND.Models;

namespace BACKEND.Data
{
	public class FoodRepository : IFoodRepository
	{
		List<Food> foods;

		public FoodRepository()
		{
			List<Food> foods = new List<Food>();
		}

		public void Create(Food food)
		{
			foods.Add(food);
		}

		public IEnumerable<Food> ReadAll()
		{
			return foods;
		}

		public Food? Read(string foodName)
		{
			return foods.FirstOrDefault(f => f.Name == foodName);
		}

		public void Delete(string foodName)
		{
			Food foodToDelete = Read(foodName);
			foods.Remove(foodToDelete);
		}
	}
}
