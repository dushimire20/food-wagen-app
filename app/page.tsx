"use client";

import { useState, useEffect } from "react";
import HeroSection from "./components/Hero";
import FeaturedMeals from "./components/FeaturedMeals";
import Navbar from "./components/Navbar";
import AddFoodModal from "./components/AddFoodModal";
import { Food, FoodFormData } from "./types/food";
import { fetchFoods, createFood, updateFood, deleteFood } from "./services/api";

export default function App() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
    const filtered = foods.filter(food =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFoods(filtered);
  }, [foods, searchQuery]);

  const loadFoods = async () => {
    try {
      setLoading(true);
      const data = await fetchFoods();
      setFoods(data);
      setError(null);
    } catch (err) {
      setError("Failed to load foods");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = async (foodData: FoodFormData) => {
    try {
      await createFood(foodData);
      await loadFoods();
      setShowAddModal(false);
    } catch (err) {
      setError("Failed to add food");
    }
  };

  const handleAddMeal = () => {
    setShowAddModal(true);
  };

  return (
    <div className="mx-auto">
      <Navbar onAddMeal={handleAddMeal} />
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FeaturedMeals
        foods={filteredFoods}
        setFoods={setFoods}
        loading={loading}
        error={error}
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />
      {showAddModal && (
        <AddFoodModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddFood}
        />
      )}
     
    </div>
  );
}
