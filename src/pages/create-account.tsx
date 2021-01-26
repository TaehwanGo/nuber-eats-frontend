import { gql, useMutation } from '@apollo/client';
import React from 'react';
import Helmet from 'react-helmet';
import { useForm } from 'react-hook-form';
import { FormError } from '../components/form-error';
import nuberLogo from '../images/logo.svg'; // svg는 import 가능
import { Button } from '../components/button';
import { Link } from 'react-router-dom';
import { UserRole } from '../__generated__/globalTypes';

// 아래 mutation이름 (PotatoMutation)은 백엔드로 가는게 아니라 프론트에서 쓰여질 것임(Apollo)
// Apollo는 이 변수들을 살펴보고 내가 작성한 변수들을 가지고 mutation을 만들음
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccount: CreateAccountInput!) {
    createAccount(input: $createAccount) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    watch,
    errors,
    handleSubmit,
    formState,
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  }); // useForm + useMutation => awesome !
  // const onCompleted = data => {
  //   const {
  //     login: { error, ok },
  //   } = data;
  //   if (ok) {
  //     console.log(ok);
  //   } else {
  //     console.log(error);
  //   }
  // };
  // useMutation의 결과 array의 0번째, 함수(loginMutation)는 반드시 호출해줘야 함 : 그래야 backend로 mutation이 전달됨
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION); // useMutation으로 받는 첫번째 arg는 mutation function 이고 trigger 역할을 함
  const onSubmit = () => {
    // if (!loading) {
    //   const { email, password } = getValues();
    //   createAccountMutation({
    //     variables: {
    //       loginInput: {
    //         email,
    //         password,
    //       },
    //     },
    //   });
    // }
  };
  console.log(watch());
  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>CreateAccount | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} alt="logoImg" className="w-52 mb-10" />
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Let's get started
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
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
            className="input"
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
          <select
            name="role"
            ref={register({ required: true })}
            className="input"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index} className="input">
                {role}
              </option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={false}
            actionText="Create Account"
          />
          {/* {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )} */}
        </form>
        <div>
          Already have an account?{' '}
          <Link to="/login" className="text-lime-600 hover:underline">
            Log in now
          </Link>
        </div>
      </div>
    </div>
  );
};
