import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragment';
import {
  categoryQuery,
  categoryQueryVariables,
} from '../../__generated__/categoryQuery';

const CATEGORY_QUERY = gql`
  query categoryQuery($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  //   const location = useLocation(); // router에서 /:slug 를 붙여서 parameter를 가져올 수 있으므로 useParams를 쓰는게 더 좋음
  //   useEffect(() => {
  //     console.log(location);
  //   }, [location]);
  const params = useParams<ICategoryParams>();
  const { data, loading } = useQuery<categoryQuery, categoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug,
        },
      },
    },
  );
  console.log(data);
  return <h1>Category</h1>;
};
