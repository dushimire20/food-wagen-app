import { Food, FoodFormData } from '../types/food';

const API_BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io/Food';

export const fetchFoods = async (): Promise<Food[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch foods');
  }
  return response.json();
};

export const fetchFoodsByName = async (name: string): Promise<Food[]> => {
  const response = await fetch(`${API_BASE_URL}?name=${encodeURIComponent(name)}`);
  if (!response.ok) {
    throw new Error('Failed to search foods');
  }
  return response.json();
};

export const createFood = async (foodData: FoodFormData): Promise<Food> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: foodData.name,
      image: foodData.image,
      price: foodData.price,
      rating: foodData.rating,
      restaurant: {
        name: foodData.restaurant_name,
        logo: foodData.restaurant_logo,
        status: foodData.restaurant_status,
      },
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create food');
  }
  return response.json();
};

export const updateFood = async (id: string, foodData: FoodFormData): Promise<Food> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: foodData.name,
      image: foodData.image,
      price: foodData.price,
      rating: foodData.rating,
      restaurant: {
        name: foodData.restaurant_name,
        logo: foodData.restaurant_logo,
        status: foodData.restaurant_status,
      },
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update food');
  }
  return response.json();
};

export const deleteFood = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete food');
  }
};
