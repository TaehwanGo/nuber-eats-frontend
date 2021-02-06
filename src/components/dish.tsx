import React from 'react';
import { restaurantDetailQuery_findRestaurantById_restaurant_menu_options } from '../__generated__/restaurantDetailQuery';

interface IDishProps {
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  options?:
    | restaurantDetailQuery_findRestaurantById_restaurant_menu_options[]
    | null;
}

export const Dish: React.FC<IDishProps> = ({
  description,
  name,
  price,
  isCustomer = false,
  options,
}) => {
  console.log(options);
  return (
    <div className="px-6 py-4 border hover:border-gray-800 transition-all">
      <div className="mb-5">
        <h3 className="text-lg font-semibold">{name}</h3>
        <h4>{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="my-3 font-semibold">Dish Options:</h5>
          {options?.map((option, index) => (
            <span key={index} className="flex items-center">
              <h6 className="mr-2">{option.name}</h6>
              <h6 className="text-sm opacity-75">${option.extra}</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
