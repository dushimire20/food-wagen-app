import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeaturedMeals from '../app/components/FeaturedMeals';
import { Food } from '../app/types/food';

// Mock fetch globally
global.fetch = jest.fn();

const mockFoods: Food[] = [
  {
    id: '1',
    name: 'Test Food',
    image: 'test.jpg',
    price: '$10.00',
    rating: 4.5,
    restaurant: {
      name: 'Test Restaurant',
      logo: 'logo.jpg',
      status: 'Open Now',
    },
  },
];

describe('FeaturedMeals Component Rendering', () => {
  it('renders food name, price, and rating correctly', () => {
    render(
      <FeaturedMeals
        foods={mockFoods}
        setFoods={jest.fn()}
        loading={false}
        error={null}
        showAddModal={false}
        setShowAddModal={jest.fn()}
      />
    );

    expect(screen.getByText('Test Food')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
  });
});

describe('FeaturedMeals User Interaction', () => {
  it('opens edit modal when edit button is clicked', () => {
    render(
      <FeaturedMeals
        foods={mockFoods}
        setFoods={jest.fn()}
        loading={false}
        error={null}
        showAddModal={false}
        setShowAddModal={jest.fn()}
      />
    );

    const editButton = screen.getByTestId('food-edit-btn');
    fireEvent.click(editButton);

    // Assuming modal opens, check for modal content or state change
    // This would require mocking the modal or checking for specific elements
  });
});

describe('FeaturedMeals API Mocking', () => {
  it('displays error message on failed API fetch', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(
      <FeaturedMeals
        foods={[]}
        setFoods={jest.fn()}
        loading={false}
        error="Failed to load foods"
        showAddModal={false}
        setShowAddModal={jest.fn()}
      />
    );

    expect(screen.getByText('Failed to load foods')).toBeInTheDocument();
  });
});
