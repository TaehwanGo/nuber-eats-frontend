import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragment';
import {
  searchRestaurantInput,
  searchRestaurantInputVariables,
} from '../../__generated__/searchRestaurantInput';

const SEARCH_RESTAURANTS = gql`
  query searchRestaurantInput($input: SearchRestaurantInput!) {
    searchRestaurantByName(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  // LazyQuery는 조건부 query를 가능하게 함
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchRestaurantInput,
    searchRestaurantInputVariables
  >(SEARCH_RESTAURANTS); // callQuery()를 실행해야만 data를 얻을 수 있음
  useEffect(() => {
    const [_, query] = location.search.split('?term=');
    if (!query) {
      return history.replace('/');
    }
    // 방법1. searchTerm을 state로 설정 할 수 있음
    // 방법2. state설정 없이 Lazy Query를 만드는 것(우리가 할 방법)
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
    console.log(loading, data, called); // called는 query가 실행됐는지 안됐는지 알려줌
  }, [history, location]);
  return (
    <h1>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      Search page
    </h1>
  );
};
