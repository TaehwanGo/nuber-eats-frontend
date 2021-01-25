import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import {
  loginMutation,
  loginMutationVariables,
} from '../__generated__/loginMutation';

// 아래 mutation이름 (PotatoMutation)은 백엔드로 가는게 아니라 프론트에서 쓰여질 것임(Apollo)
// Apollo는 이 변수들을 살펴보고 내가 작성한 변수들을 가지고 mutation을 만들음
const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();
  const [loginMutation] = useMutation<loginMutation, loginMutationVariables>(
    LOGIN_MUTATION,
  ); // useMutation으로 받는 첫번째 arg는 mutation function 이고 trigger 역할을 함
  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };
  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-5 pb-7 rounded-lg text-center">
        <h3 className="font-bold text-3xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5"
        >
          <input
            ref={register({
              required: 'Email is required',
              pattern: {
                value: emailRegex,
                message: 'Email must be type of email',
              },
            })}
            required
            name="email"
            placeholder="Email"
            className="mb-3 input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            ref={register({ required: 'Password is required' })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === 'minLength' && (
            <FormError errorMessage="Password must be more than 8 chars." />
          )}
          <button className="mt-3 btn">Log in</button>
        </form>
      </div>
    </div>
  );
};
