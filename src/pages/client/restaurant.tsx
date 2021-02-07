import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragment';
import {
  restaurantDetailQuery,
  restaurantDetailQueryVariables,
} from '../../__generated__/restaurantDetailQuery';
import { CreateOrderItemInput } from '../../__generated__/globalTypes';

const RESTAURANT_QUERY = gql`
  query restaurantDetailQuery($input: RestaurantInput!) {
    findRestaurantById(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IRestaurantParams {
  id: string;
}

export const RestaurantDetail = () => {
  const params = useParams<IRestaurantParams>();
  const { loading, data } = useQuery<
    restaurantDetailQuery,
    restaurantDetailQueryVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +params.id, // parseInt(params.id),
      },
    },
  });
  // console.log(data);
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const isSelected = (dishId: number) => {
    return Boolean(orderItems.find(order => order.dishId === dishId));
  };
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems(current => [{ dishId }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems(current => current.filter(dish => dish.dishId !== dishId));
  };
  console.log(orderItems);
  return (
    <div>
      <div
        className="bg-gray-300 bg-center bg-cover py-32"
        style={{
          backgroundImage: `url(${data?.findRestaurantById.restaurant?.coverImage})`,
        }}
      >
        <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto">
          <div className="max-w-screen-sm py-4 text-white">
            <h4 className="text-4xl mb-2">
              {data?.findRestaurantById.restaurant?.name}
            </h4>
            <h5>{data?.findRestaurantById.restaurant?.category?.name}</h5>
            <h5>{data?.findRestaurantById.restaurant?.address}</h5>
          </div>
        </div>
      </div>
      <div className="container pb-10 mt-20 flex flex-col items-end">
        <button onClick={triggerStartOrder} className="btn px-10">
          {orderStarted ? 'Ordering...' : 'Start Order'}
        </button>
        {data?.findRestaurantById.restaurant?.menu.length === 0 ? (
          <h4 className="text-xl mb-5">Please upload a dish.</h4>
        ) : (
          <div className="w-full grid md:grid-cols-3 gap-x-5 gap-y-10 mt-10">
            {data?.findRestaurantById.restaurant?.menu.map(dish => (
              <Dish
                isSelected={isSelected(dish.id)}
                id={dish.id}
                orderStarted={orderStarted}
                key={dish.id}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                isCustomer={true}
                options={dish.options}
                addItemToOrder={addItemToOrder}
                removeFromOrder={removeFromOrder}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
