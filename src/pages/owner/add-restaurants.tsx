import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { createAccountMutationVariables } from '../../__generated__/createAccountMutation';
import { createRestaurantMutation } from '../../__generated__/createRestaurantMutation';

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurantMutation($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  // input의 name값은 IFormProp의 키와 같아야 함
  name: string;
  address: string;
  categoryName: string;
}

// query를 먼저 가져와서 전체적인 그림을 파악 한 후 make component detail
export const AddRestaurant = () => {
  const [callCreateRestaurantMutation, { data, loading }] = useMutation<
    createRestaurantMutation,
    createAccountMutationVariables
  >(CREATE_RESTAURANT_MUTATION);
  const {
    register,
    getValues,
    formState,
    errors,
    handleSubmit,
  } = useForm<IFormProps>({
    mode: 'onChange',
  });
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="container">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Name"
          ref={register({ required: 'Name is required.' })}
        />
        <input
          className="input"
          type="text"
          name="address"
          placeholder="Address"
          ref={register({ required: 'Address is required.' })}
        />
        <input
          className="input"
          type="text"
          name="categoryName"
          placeholder="Category name"
          ref={register({ required: 'Category name is required.' })}
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Restaurant"
        />
      </form>
    </div>
  );
};
