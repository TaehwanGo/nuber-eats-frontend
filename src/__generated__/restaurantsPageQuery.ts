/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsPageQuery
// ====================================================

export interface restaurantsPageQuery_seeRestaurantsByPage_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface restaurantsPageQuery_seeRestaurantsByPage_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: restaurantsPageQuery_seeRestaurantsByPage_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface restaurantsPageQuery_seeRestaurantsByPage {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: restaurantsPageQuery_seeRestaurantsByPage_restaurants[] | null;
}

export interface restaurantsPageQuery {
  seeRestaurantsByPage: restaurantsPageQuery_seeRestaurantsByPage;
}

export interface restaurantsPageQueryVariables {
  input: RestaurantsInput;
}
