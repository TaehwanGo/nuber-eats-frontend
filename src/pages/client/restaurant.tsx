import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragment';
import {
  restaurantDetailQuery,
  restaurantDetailQueryVariables,
} from '../../__generated__/restaurantDetailQuery';

const RESTAURANT_QUERY = gql`
  query restaurantDetailQuery($input: RestaurantInput!) {
    findRestaurantById(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
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
  console.log(data);
  return (
    <div>
      <div
        className="bg-gray-300 bg-center bg-cover py-32 md:py-40 lg:py-52"
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
    </div>
  );
};
