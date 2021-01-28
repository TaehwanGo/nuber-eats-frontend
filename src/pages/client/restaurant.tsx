import { gql, useQuery } from '@apollo/client';
import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Restaurant } from '../../components/restaurant';
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
  const [page, setPage] = useState(1); // default value : 1
  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        // 우리가 state(page)를 변경하면 Query는 state에 depend하기 때문에 Query의 variable또한 바뀜 => re-render
        page, // page: page(from state hook)
      },
    },
  });
  console.log(data);
  const onNextPageClick = () => setPage(current => current + 1); // setState():setPage 에서 argument:current는 현재 state:page임
  const onPrevPageClick = () => setPage(current => current - 1);
  return (
    <section>
      <form
        // style={{
        //   backgroundImage: `url(data:image/jpeg;base64,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)`,
        // }}
        className="bg-gray-800 w-full py-20 flex items-center justify-center px-5"
      >
        <input
          type="Search"
          className="input w-full max-w-screen-sm rounded-md border-0"
          placeholder="Search restaurants..."
        />
      </form>

      {!loading && (
        <div className="px-5 xl:px-0 max-w-screen-2xl mx-auto pb-20">
          <div className="flex justify-around max-w-sm mx-auto mt-8 ">
            {data?.allCategories.categories?.map(category => (
              <div className="group flex flex-col items-center cursor-pointer">
                <div
                  className="w-16 h-16 bg-cover rounded-full group-hover:bg-gray-100"
                  style={{ backgroundImage: `url(${category.coverImage})` }}
                ></div>
                <span className="text-sm text-center font-semibold mt-1">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-10 mt-16">
            {data?.seeRestaurantsByPage.restaurants?.map(restaurant => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ''}
                coverImage={restaurant.coverImage}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 text-center max-w-md items-center mx-auto">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="font-semibold text-2xl hover:text-green-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={faCaretSquareLeft} />
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.seeRestaurantsByPage.totalPages}
            </span>

            {page !== data?.seeRestaurantsByPage.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="font-semibold text-2xl hover:text-green-600 focus:outline-none"
              >
                <FontAwesomeIcon icon={faCaretSquareRight} />
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
