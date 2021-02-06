import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import { RESTAURANT_FRAGMENT, DISH_FRAGMENT } from '../../fragment';
import {
  myRestaurant,
  myRestaurantVariables,
} from '../../__generated__/myRestaurant';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
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
`; // 나중에 fragment로 얻는 것 외에 그 다음줄에 필요한 것들을 추가할 수 있음 - 이번엔 fragment를 추가함

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    },
  );
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>My Restaurant | Nuber Eats</title>
      </Helmet>
      <div
        className="bg-gray-400 py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImage})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || 'Loading...'}
        </h2>
        <Link
          to={`/restaurants/${id}/add-dish`}
          className="mr-8 text-white bg-gray-800 py-3 px-10"
        >
          Add Dish &rarr;
        </Link>
        <Link to={``} className=" text-white bg-lime-700 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish.</h4>
          ) : (
            <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-10">
              {data?.myRestaurant.restaurant?.menu.map(dish => (
                <Dish
                  key={dish.id}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-2xl font-semibold">Sales</h4>
          <div className="max-w-screen-sm w-full mx-auto">
            <VictoryChart domainPadding={20}>
              <VictoryAxis label="Amount of Money" dependentAxis />
              <VictoryAxis label="Days of Life" tickValues={[10, 20, 30, 40]} />
              <VictoryBar
                data={[
                  { x: 10, y: 20 },
                  { x: 20, y: 5 },
                  { x: 30, y: 15 },
                  { x: 40, y: 28 },
                ]}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
