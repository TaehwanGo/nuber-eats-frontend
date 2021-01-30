import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Loader from 'react-loader-spinner';
import { useLocation, useParams } from 'react-router-dom';
import { Pagination } from '../../components/pagination';
import { Restaurant } from '../../components/restaurant';
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
  const [page, setPage] = useState(1); // default value : 1
  const onNextPageClick = () => setPage(current => current + 1); // setState():setPage 에서 argument:current는 현재 state:page임
  const onPrevPageClick = () => setPage(current => current - 1);
  const { data, loading } = useQuery<categoryQuery, categoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page,
          slug: params.slug,
        },
      },
    },
  );
  console.log(data);
  //
  return (
    <section className="flex w-full px-5 xl:px-0 max-w-screen-xl mx-auto">
      <Helmet>
        <title>Category | Nuber Eats</title>
      </Helmet>
      <nav className="hidden md:block min-w-max py-4">
        <div className="w-64 max-h-screen sticky top-0">
          {data?.category.category && (
            <>
              <h1 className="text-3xl font-semibold">{`"${data.category.category.name}"`}</h1>
              <h2 className="text-base mt-2">{`${data.category.category.restaurantCount} Restaurants`}</h2>
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
            {data?.category.restaurants?.map(restaurant => (
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
          totalPages={data?.category.totalPages}
          onNextPageClick={onNextPageClick}
          onPrevPageClick={onPrevPageClick}
        />
        {/* <div className="h-screen">sticky 확인용 div</div> */}
      </main>
    </section>
  );
};
