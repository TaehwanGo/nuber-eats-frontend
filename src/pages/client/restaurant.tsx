import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__generated__/restaurantsPageQuery';

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    seeRestaurantsByPage(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  console.log(data);
  return (
    <section>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center px-5">
        <input
          type="Search"
          className="input w-full max-w-screen-sm rounded-md border-0"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="px-5 xl:px-0 max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto">
            {data?.allCategories.categories?.map(category => (
              <div className="flex flex-col items-center cursor-pointer">
                <div
                  className="w-14 h-14 bg-cover rounded-full hover:bg-gray-100"
                  style={{ backgroundImage: `url(${category.coverImage})` }}
                ></div>
                <span className="text-sm text-center font-semibold mt-1">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
