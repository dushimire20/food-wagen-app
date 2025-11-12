"use client";

import React, { useState } from 'react';
import { Food, FoodFormData } from '../types/food';

interface AddFoodModalProps {
  onClose: () => void;
  onSubmit: (foodData: FoodFormData) => void;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<FoodFormData>({
    name: '',
    image: '',
    price: '',
    rating: 1,
    restaurant_name: '',
    restaurant_logo: '',
    restaurant_status: 'Open Now',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Food Name is required';
    if (!formData.image.trim()) newErrors.image = 'Food Image URL is required';
    if (!formData.price.trim()) newErrors.price = 'Food Price is required';
    if (formData.rating < 1 || formData.rating > 5) newErrors.rating = 'Food Rating must be a number between 1 and 5';
    if (!formData.restaurant_name.trim()) newErrors.restaurant_name = 'Restaurant Name is required';
    if (!formData.restaurant_logo.trim()) newErrors.restaurant_logo = 'Restaurant Logo URL is required';
    if (formData.restaurant_status !== 'Open Now' && formData.restaurant_status !== 'Closed') {
      newErrors.restaurant_status = 'Restaurant Status must be "Open Now" or "Closed"';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        image: '',
        price: '',
        rating: 1,
        restaurant_name: '',
        restaurant_logo: '',
        restaurant_status: 'Open Now',
      });
    } catch (err) {
      alert('Failed to add food');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 w-4/6 mx-auto">
      <div className="bg-white rounded-lg p-6 w-full  px-16 py-10 mx-4">
        <h2 className="text-xl font-bold mb-4 text-center text-accent-400">Add Food</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="food_name" className="block text-sm font-medium mb-1">Food Name</label>
            <input
              type="text"
              id="food_name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="food-input w-full px-3 py-2 border rounded"
              placeholder="Enter food name"
            />
            {errors.name && <p id="food-name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="food_image" className="block text-sm font-medium mb-1">Food Image URL</label>
            <input
              type="text"
              id="food_image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="food-input w-full px-3 py-2 border rounded"
              placeholder="Enter food image URL"
            />
            {errors.image && <p id="food-image-error" className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="food_price" className="block text-sm font-medium mb-1">Food Price</label>
            <input
              type="text"
              id="food_price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="food-input w-full px-3 py-2 border rounded"
              placeholder="Food price ($)"
            />
            {errors.price && <p id="food-price-error" className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="food_rating" className="block text-sm font-medium mb-1">Food Rating</label>
            <input
              type="number"
              id="food_rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              className="food-input w-full px-3 py-2 border rounded"
            />
            {errors.rating && <p id="food-rating-error" className="text-red-500 text-sm mt-1">{errors.rating}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="restaurant_name" className="block text-sm font-medium mb-1">Restaurant Name</label>
            <input
              type="text"
              id="restaurant_name"
              name="restaurant_name"
              value={formData.restaurant_name}
              onChange={handleChange}
              className="food-input w-full px-3 py-2 border rounded"
              placeholder="Enter restaurant name"
            />
            {errors.restaurant_name && <p id="restaurant-name-error" className="text-red-500 text-sm mt-1">{errors.restaurant_name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="restaurant_logo" className="block text-sm font-medium mb-1">Restaurant Logo URL</label>
            <input
              type="text"
              id="restaurant_logo"
              name="restaurant_logo"
              value={formData.restaurant_logo}
              onChange={handleChange}
              className="food-input w-full px-3 py-2 border rounded"
              placeholder="Enter restaurant logo URL"
            />
            {errors.restaurant_logo && <p id="restaurant-logo-error" className="text-red-500 text-sm mt-1">{errors.restaurant_logo}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="restaurant_status" className="block text-sm font-medium mb-1">Restaurant Status</label>
            <select
              id="restaurant_status"
              name="restaurant_status"
              value={formData.restaurant_status}
              onChange={handleChange}
              className="food-input w-full px-3 py-2 border rounded"
            >
              <option value="Open Now">Open Now</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.restaurant_status && <p id="restaurant-status-error" className="text-red-500 text-sm mt-1">{errors.restaurant_status}</p>}
          </div>

          <div className="flex items-center space-x-2">
           
            <button
              type="submit"
              className="food-btn w-1/2 px-4 py-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Food...' : 'Add Food'}
            </button>
             <button
              type="button"
              onClick={onClose}
              className="food-btn  w-1/2 px-4 py-4 bg-white  rounded-2xl border border-accent-400 hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodModal;
