import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Loader from 'react-loader-spinner';
import { useHistory, useLocation } from 'react-router-dom';
import { Pagination } from '../../components/pagination';
import { Restaurant } from '../../components/restaurant';
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
  const [page, setPage] = useState(1); // default value : 1
  const onNextPageClick = () => setPage(current => current + 1); // setState():setPage 에서 argument:current는 현재 state:page임
  const onPrevPageClick = () => setPage(current => current - 1);
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
          page,
          query,
        },
      },
    });
    // console.log(loading, data, called); // called는 query가 실행됐는지 안됐는지 알려줌
  }, [page]);

  return (
    <section className="flex w-full px-5 xl:px-0 max-w-screen-xl mx-auto">
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <nav className="hidden md:block min-w-max py-4">
        <div className="w-64 max-h-screen sticky top-0">
          {!loading && (
            <>
              <h1 className="text-3xl font-semibold">{`"${
                location.search.split('?term=')[1]
              }"`}</h1>
              <h2 className="text-base mt-2">{`${data?.searchRestaurantByName.totalResults} Restaurants`}</h2>
            </>
          )}
          {/* Sort, Price range, ... we will see later */}
        </div>
      </nav>
      <main className="w-full">
        {loading && (
          <div className="mt-6 mb-4 py-32 flex justify-center">
            <Loader type="TailSpin" color="gray" height={40} width={40} />
          </div>
        )}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 py-4">
            {data?.searchRestaurantByName.restaurants?.map(restaurant => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ''}
                coverImage={restaurant.coverImage}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        )}

        <Pagination
          page={page}
          totalPages={data?.searchRestaurantByName.totalPages}
          onNextPageClick={onNextPageClick}
          onPrevPageClick={onPrevPageClick}
        />
        {/* <div className="h-screen">sticky 확인용 div</div> */}
      </main>
    </section>
  );
};
