/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantDetailQuery
// ====================================================

export interface restaurantDetailQuery_findRestaurantById_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface restaurantDetailQuery_findRestaurantById_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: restaurantDetailQuery_findRestaurantById_restaurant_category | null;
  address: string;
  isPromoted: boolean;
}

export interface restaurantDetailQuery_findRestaurantById {
  __typename: "RestaurantOutput";
  ok: boolean;
  error: string | null;
  restaurant: restaurantDetailQuery_findRestaurantById_restaurant | null;
}

export interface restaurantDetailQuery {
  findRestaurantById: restaurantDetailQuery_findRestaurantById;
}

export interface restaurantDetailQueryVariables {
  input: RestaurantInput;
}
