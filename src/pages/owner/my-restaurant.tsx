import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragment';
import {
  myRestaurant,
  myRestaurantVariables,
} from '../../__generated__/myRestaurant';

const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`; // 나중에 fragment로 얻는 것 외에 그 다음줄에 필요한 것들을 추가할 수 있음

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
  return <h1>My Restaurant</h1>;
};
