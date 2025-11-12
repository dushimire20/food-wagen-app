export interface Food {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  restaurant?: {
    name: string;
    logo: string;
    status: "Open Now" | "Closed";
  };
}

export interface FoodFormData {
  name: string;
  image: string;
  price: string;
  rating: number;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: "Open Now" | "Closed";
}
