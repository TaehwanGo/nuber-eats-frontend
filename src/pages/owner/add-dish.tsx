import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
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
    setValue,
  } = useForm<IForm>({
    mode: 'onChange', // formState.isValid 는 onChange를 해줘야 모든 input에 대해 검사를 할 수 있음
  });

  const onSubmit = () => {
    // console.log(getValues());
    const { name, price, description, ...rest } = getValues();
    console.log(rest);
    // createDishMutation({
    //   variables: {
    //     input: {
    //       name,
    //       price: +price,
    //       description,
    //       restaurantId: +restaurantId,
    //     },
    //   },
    // });
    // history.goBack();
  };
  const [optionsNumber, setOptionsNumber] = useState(0);
  const onAddOptionClick = () => {
    setOptionsNumber(current => current + 1);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber(current => current - 1);
    // @ts-ignore
    setValue(`${idToDelete}-optionName`, ''); // typeScript는 "name", "price", "description"만 인정함
    // @ts-ignore
    setValue(`${idToDelete}-optionExtra`, '');
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

        <div className="my-10">
          <h4 className="font-medium mb-3 text-lg">Dish Options</h4>
          <span
            onClick={onAddOptionClick}
            className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
          >
            Add Dish Option
          </span>
          {optionsNumber !== 0 &&
            Array.from(new Array(optionsNumber)).map((
              _,
              index, // optionsNumber 만큼 map 실행
            ) => (
              <div key={index} className="mt-5">
                <input
                  ref={register}
                  name={`${index}-optionName`}
                  className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  ref={register}
                  name={`${index}-optionExtra`}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  min={0}
                  placeholder="Option Extra"
                />
                <span onClick={() => onDeleteClick(index)}>Delete Option</span>
              </div>
            ))}
        </div>

        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
};
