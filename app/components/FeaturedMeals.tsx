"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Food } from "../types/food";
import AddFoodModal from "./AddFoodModal";
import EditFoodModal from "./EditFoodModal";
import DeleteFoodModal from "./DeleteFoodModal";
import { deleteFood } from "../services/api";
import { Tag } from "lucide-react";

interface FeaturedMealsProps {
  foods: Food[];
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>;
  loading: boolean;
  error: string | null;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeaturedMeals({ foods, setFoods, loading, error, showAddModal, setShowAddModal }: FeaturedMealsProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    // Trigger slide-up animation on mount
    const cards = document.querySelectorAll('.food-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-slide-up');
      }, index * 100);
    });
  }, [foods]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && !(event.target as Element).closest('.menu-container')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const handleEdit = (food: Food) => {
    setSelectedFood(food);
    setShowEditModal(true);
  };

  const handleDelete = (food: Food) => {
    setSelectedFood(food);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedFood) return;
    setIsSubmitting(true);
    try {
      await deleteFood(selectedFood.id);
      setFoods(foods.filter((f: Food) => f.id !== selectedFood.id));
      setShowDeleteModal(false);
    } catch (err) {
      alert('Failed to delete food');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMenu = (foodId: string) => {
    setOpenMenuId(openMenuId === foodId ? null : foodId);
  };

  if (loading) {
    return (
      <section className="py-10">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-orange-500"></div>
          <p className="mt-4">Loading foods...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button className="mt-4 food-btn bg-orange-500 text-white px-4 py-2 rounded">Retry</button>
        </div>
      </section>
    );
  }

  if (foods.length === 0) {
    return (
      <section className="py-10">
        <h2 className="text-2xl font-bold text-center mb-6">Featured Meals</h2>
        <div className="text-center">
          <div className="empty-state-message">No foods available. Add some meals to get started!</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 w-5/6 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Featured Meals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {foods.map((food) => (
          <div
            key={food.id}
            className="food-card bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
            data-test-id="food-card"
          >
            <div className="relative">
              {food.image && (
                <Image
                  src={food.image}
                  alt={food.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />
              )}
              <div className="absolute top-6 left-6 bg-orange-500 text-white text-sm font-bold 
                flex items-center justify-center rounded px-3 py-1">
  <Tag className="mr-2" size={16} />
  ${food.price}
</div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {food.restaurant?.logo && (
                    <Image
                      src={food.restaurant.logo}
                      alt={food.restaurant.name}
                      width={50}
                      height={50}
                      className="restaurant-logo"
                    />
                  )}
                  <div className="flex flex-col">
                    <h3 className="food-name text-lg font-semibold">{food.name}</h3>
                    <p className="food-rating text-sm text-gray-500">⭐ {food.rating}</p>
                  </div>
                </div>
                <div className="menu-container relative">
                  <button
                    onClick={() => toggleMenu(food.id)}
                    className="text-gray-600 hover:text-gray-800"
                    data-test-id="menu-btn"
                  >
                    ⋮
                  </button>
                  {openMenuId === food.id && (
                    <div className="absolute top-6 right-0 bg-white shadow-md rounded-md py-1 z-10">
                      <button
                        onClick={() => {
                          handleEdit(food);
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        data-test-id="food-edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(food);
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        data-test-id="food-delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <span
                  className={`text-xs px-4 py-2 rounded-3xl font-bold ml-2 ${
                    food.restaurant?.status === "Open Now"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {food.restaurant?.status || 'Closed'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {showAddModal && <AddFoodModal onClose={() => setShowAddModal(false)} onSubmit={(foodData) => { /* handle submit */ }} />}
      {showEditModal && selectedFood && <EditFoodModal food={selectedFood} onClose={() => setShowEditModal(false)} onSave={(updatedFood) => { setFoods(foods.map(f => f.id === updatedFood.id ? updatedFood : f)); setShowEditModal(false); }} />}
      {showDeleteModal && selectedFood && <DeleteFoodModal food={selectedFood} onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete} isSubmitting={isSubmitting} />}
    </section>
  );
}
