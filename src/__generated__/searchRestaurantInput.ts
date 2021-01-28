/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurantInput
// ====================================================

export interface searchRestaurantInput_searchRestaurantByName_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurantInput_searchRestaurantByName_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: searchRestaurantInput_searchRestaurantByName_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface searchRestaurantInput_searchRestaurantByName {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: searchRestaurantInput_searchRestaurantByName_restaurants[] | null;
}

export interface searchRestaurantInput {
  searchRestaurantByName: searchRestaurantInput_searchRestaurantByName;
}

export interface searchRestaurantInputVariables {
  input: SearchRestaurantInput;
}
