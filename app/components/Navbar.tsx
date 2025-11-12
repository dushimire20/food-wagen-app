import React from 'react';
import Image from 'next/image';

interface NavbarProps {
  onAddMeal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddMeal }) => {
  const handleAddMeal = () => {
    onAddMeal();
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 w-5/6 mx-auto">
        <div>
            <Image
                src="/Logo.png"
                alt="Logo"
                width={120}
                height={40}
                className="w-16 h-auto md:w-32"
            />
        </div>

        <div>
            <button
              onClick={handleAddMeal}
              className="bg-linear-to-r text-white px-3 py-1 text-sm rounded-2xl from-accent-300 to-accent-400 md:px-4 md:py-2 md:text-base food-btn"
              data-test-id="food-add-btn"
            >
              Add meal
            </button>
        </div>

    </div>
  )
}

export default Navbar
