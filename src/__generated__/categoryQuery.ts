/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: categoryQuery
// ====================================================

export interface categoryQuery_category_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface categoryQuery_category_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: categoryQuery_category_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface categoryQuery_category_category {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface categoryQuery_category {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: categoryQuery_category_restaurants[] | null;
  category: categoryQuery_category_category | null;
}

export interface categoryQuery {
  category: categoryQuery_category;
}

export interface categoryQueryVariables {
  input: CategoryInput;
}
