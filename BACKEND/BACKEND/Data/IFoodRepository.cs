using BACKEND.Models;

namespace BACKEND.Data
{
	public interface IFoodRepository
	{
		void Create(Food food);
		Food? Read(string foodName);
		IEnumerable<Food> ReadAll();
		void Delete(string foodName);
	}
}