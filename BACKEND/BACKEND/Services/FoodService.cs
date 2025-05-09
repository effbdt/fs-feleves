﻿using BACKEND.Data;
using BACKEND.Models;

namespace BACKEND.Services
{
	public class FoodAlreadyExistsException : Exception
	{
		public FoodAlreadyExistsException(string name)
			: base($"A(z) '{name}' nevű élelmiszer már létezik.") { }
	}

	public class FoodService : IFoodService
	{
		private readonly IFoodRepository _repo;

		public FoodService(IFoodRepository _repo)
		{
			this._repo = _repo;
		}

		public void CreateFood(Food food)
		{
			if (GetFood(food.Name) != null)
			{
				throw new FoodAlreadyExistsException(food.Name);
			}
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

			return foodList.OrderBy(f => f.ExpirationDate).ToList();
		}

		//if theres 2 or less, or it expires in the next 2 days it gets returned as a suggestion
		public IEnumerable<Food> BuySuggestions()
		{
			var foodList = _repo.ReadAll();

			var suggestions = foodList
				.Where(f => f.Quantity <= 2 || CloseToExpiration(f.ExpirationDate)).ToList();

			return suggestions;
		}


		//checks if expiration date is in 2 days or less
		private bool CloseToExpiration(DateTime date)
		{
			DateTime now = DateTime.Now;
			DateTime twoDaysLater = now.AddDays(2);

			return date <= now.AddDays(1) && date <= twoDaysLater;
		}


		public IEnumerable<double> MonthlyEstimation()
		{
			var foods = _repo.ReadAll();

			List<double> estimatedConsumptionList = new List<double>();
			foreach (var food in foods)
			{
				estimatedConsumptionList.Add(RatioEstimation(food));
			}

			var orderedList = estimatedConsumptionList.OrderDescending();

			return orderedList;
		}


		//gives a rough estimation on monthly usage of a given food item
		private double RatioEstimation(Food food)
		{
			double dayUntilExp = (food.ExpirationDate.Day - DateTime.Now.Day);

			if (dayUntilExp <= 0)
			{
				return 0;
			}

			double estimatedDailyUsage = food.Quantity / dayUntilExp;

			return estimatedDailyUsage * 30;
		}
	}
}
