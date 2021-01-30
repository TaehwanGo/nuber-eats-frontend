import { gql, useQuery } from '@apollo/client';
import {
  faCaretSquareLeft,
  faCaretSquareRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Categories } from '../../components/categories';
import { Restaurant } from '../../components/restaurant';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragment';
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from '../../__generated__/restaurantsPageQuery';
import Loader from 'react-loader-spinner';
import { allCategoriesQuery } from '../../__generated__/allCategoriesQuery';
import { Pagination } from '../../components/pagination';

const CATEGORIES_QUERY = gql`
  query allCategoriesQuery {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    seeRestaurantsByPage(input: $input) {
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
interface IFormProps {
  searchTerm: string;
}
export const Restaurants = () => {
  const [page, setPage] = useState(1); // default value : 1

  const {
    data: allCategories,
    loading: loadingCategories,
  } = useQuery<allCategoriesQuery>(CATEGORIES_QUERY);

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
  //   console.log(data);
  const onNextPageClick = () => setPage(current => current + 1); // setState():setPage 에서 argument:current는 현재 state:page임
  const onPrevPageClick = () => setPage(current => current - 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory(); // for redirect

  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: '/search',
      search: `?term=${searchTerm}`,
      //   state: {
      //     searchTerm, // 이런식으로 url에 노출시키지 않고 원하는 데이터를 보낼 수 있음 : 브라우저 메모리에 저장하기 때문에 새로고침해도 state에 남아 있음
      //   },
    });
  };

  return (
    <section>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-20 flex items-center justify-center px-5"
      >
        <input
          ref={register({ required: true })}
          name="searchTerm"
          type="Search"
          className="input w-full max-w-screen-sm rounded-md border-0"
          placeholder="Search restaurants..."
        />
      </form>
      {loadingCategories && (
        <div className="py-10 flex justify-center">
          <Loader type="TailSpin" color="gray" height={40} width={40} />
        </div>
      )}
      {!loadingCategories && (
        <div className="px-5 xl:px-0 max-w-screen-2xl mx-auto">
          <div className="flex justify-around max-w-sm mx-auto mt-8 ">
            {allCategories?.allCategories.categories?.map(category => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <Categories
                  key={category.id}
                  id={category.id + ''}
                  coverImage={
                    category.coverImage ? category.coverImage : undefined
                  }
                  name={category.name}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
      {loading && (
        <div className="mt-12 py-32 flex justify-center">
          <Loader type="TailSpin" color="gray" height={40} width={40} />
        </div>
      )}
      {!loading && (
        <div className="px-5 xl:px-0 max-w-screen-xl mx-auto w-full">
          <div className="grid md:grid-cols-3 gap-x-5 gap-y-10 mt-10">
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
        </div>
      )}
      <Pagination
        page={page}
        totalPages={data?.seeRestaurantsByPage.totalPages}
        onNextPageClick={onNextPageClick}
        onPrevPageClick={onPrevPageClick}
      />
    </section>
  );
};
