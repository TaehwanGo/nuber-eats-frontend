import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import {
  createDish,
  createDishVariables,
} from '../../__generated__/createDish';
import { MY_RESTAURANT_QUERY } from './my-restaurant';

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

interface IForm {
  name: string;
  price: string; // form에는 문자열 밖에 없음
  description: string;
}

export const AddDish = () => {
  const { restaurantId } = useParams<IParams>();
  const history = useHistory();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  });
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    errors,
  } = useForm<IForm>({
    mode: 'onChange', // formState.isValid 는 onChange를 해줘야 모든 input에 대해 검사를 할 수 있음
  });

  const onSubmit = () => {
    // console.log(getValues());
    const { name, price, description } = getValues();
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
        },
      },
    });
    history.goBack();
  };
  return (
    <div className="container">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h1 className="font-semibold text-2xl mb-3">Add Dish</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5 m-auto"
      >
        <input
          type="text"
          className="input"
          name="name"
          placeholder="name"
          ref={register({ required: 'Name is required.' })}
        />
        <input
          type="number"
          className="input"
          name="price"
          min={0}
          placeholder="Price"
          ref={register({ required: 'Price is required' })}
        />
        <input
          type="text"
          className="input"
          name="description"
          placeholder="Description"
          ref={register({
            required: 'Description is required.',
            minLength: {
              value: 5,
              message: 'Description need minimum 5 length of string',
            },
          })}
        />
        {errors.description?.message && (
          <FormError errorMessage={errors.description?.message} />
        )}
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
};
