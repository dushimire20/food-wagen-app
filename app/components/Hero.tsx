"use client";

import React from "react";
import Image from "next/image";
import { Search, Motorbike, Handbag} from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ searchQuery, setSearchQuery }) => {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled in parent via filteredFoods
  };

  return (
    <section className="bg-[#FFB30E] text-white  px-6 md:px-14 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-10 food-hero">
      {/* Left Side */}
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Are you starving?
        </h1>
        <p className="text-white/90 mb-8 text-base md:text-lg">
          Within a few clicks, find meals that are accessible near you
        </p>

        {/* Delivery / Pickup Toggle */}
        <div className="bg-white text-gray-700 rounded-2xl p-4 w-full max-w-xl mx-auto lg:mx-0 shadow-md">
          <div className="flex items-center mb-4 space-x-6 border-b border-gray-200 pb-3">
            <button className="flex items-center space-x-2 text-sm font-semibold text-secondary-300 bg-[#F172281A] px-4 py-2 rounded-lg transition hover:bg-orange-600">
              <Motorbike size={18} />
              <span>Delivery</span>
            </button>
            <button className="flex items-center space-x-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition">
              <Handbag size={18} />
              <span>Pickup</span>
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center justify-between gap-3 flex-col sm:flex-row">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="food-search"
                name="food_search"
                type="text"
                placeholder="What do you like to eat today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="food-input w-full bg-gray-100 text-gray-700 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="food-btn bg-linear-to-r from-accent-100 to-accent-200 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition"
            >
              <span className="flex">
                <Search className="w-5 h-5 mr-2" />
              Find Meal
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Food Image */}
      <div className="">
        <div className="mt-30 ">
          <Image
            src="/HeroImage.png"
            alt="Delicious noodles bowl"
            width={497}
            height={497}
                       
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
