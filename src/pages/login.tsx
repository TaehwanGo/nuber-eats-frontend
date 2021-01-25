import React from 'react';
import { useForm } from 'react-hook-form';

interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();
  const onSubmit = () => {
    // for onValid
    console.log(getValues());
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-5 pb-7 rounded-lg text-center">
        <h3 className="font-bold text-3xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5"
        >
          <input
            ref={register({ required: 'Email is required' })}
            required
            name="email"
            placeholder="Email"
            className="mb-3 input"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500">
              {errors.email?.message}
            </span>
          )}
          <input
            ref={register({ required: 'Password is required', minLength: 8 })}
            required
            name="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <span className="font-medium text-red-500">
              {errors.password?.message}
            </span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className="font-medium text-red-500">
              Password must be more than 8 chars.
            </span>
          )}
          <button className="mt-3 btn">Log in</button>
        </form>
      </div>
    </div>
  );
};
