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
  return <h1>Restaurant</h1>;
};
