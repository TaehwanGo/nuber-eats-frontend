import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { createAccountMutationVariables } from '../../__generated__/createAccountMutation';
import {
  createRestaurantMutation,
  createRestaurantMutationVariables,
} from '../../__generated__/createRestaurantMutation';

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
  file: FileList;
}

// query를 먼저 가져와서 전체적인 그림을 파악 한 후 make component detail
export const AddRestaurant = () => {
  const onCompleted = (data: createRestaurantMutation) => {
    const {
      createRestaurant: { ok, error },
    } = data;
    if (ok) {
      setUploading(false);
    }
  };
  const [callCreateRestaurantMutation, { data }] = useMutation<
    createRestaurantMutation,
    createRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUTATION, { onCompleted });

  const {
    register,
    getValues,
    formState,
    errors,
    handleSubmit,
  } = useForm<IFormProps>({
    mode: 'onChange',
  });
  const [uploading, setUploading] = useState(false); // file upload 후 json을 받는 것 까지 button의 loading상태가 기다리도록 하기 위함
  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0]; // file은 list로 여러개 file이 존재함
      const formBody = new FormData();
      formBody.append('file', actualFile);
      const { fileUrl: coverImage } = await (
        await fetch('http://localhost:4000/uploads/', {
          method: 'POST',
          body: formBody,
        })
      ).json();

      //   console.log(fileUrl);
      // url을 갖고 있으니 mutation을 완전하게 작성할 수 있음
      callCreateRestaurantMutation({
        variables: {
          input: {
            name,
            coverImage,
            address,
            categoryName,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1 className="font-semibold text-2xl mb-3">Add Restaurant</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
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
        <div>
          <input
            type="file"
            name="file"
            accept="image/*"
            ref={register({ required: true })}
          />
        </div>
        <Button
          loading={uploading} // loading is only from mutation -> onCompleted가 다 될때까지 기다리게 해야함
          canClick={formState.isValid}
          actionText="Create Restaurant"
        />
        {data?.createRestaurant.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )}
      </form>
    </div>
  );
};
