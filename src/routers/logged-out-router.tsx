import React from 'react';
import { useForm } from 'react-hook-form';

interface IForm {
  // interface인 것을 이름만으로 알기 위해 I를 추가함
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm<IForm>();
  //   console.log(watch()); // input에 타이핑 되는 것을 watch // onChange, event 같은 것을 대체
  const onSubmit = () => {
    // handleSubmit은 내 handleSubmit함수와 함께 불러와야 함
    console.log(watch('email'));
  };
  // handleSubmit은 onValid 와 onInvalid 둘다 줄 수 있음
  const onInvalid = () => {
    console.log("can't create account");
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            ref={register({
              required: 'This is required',
              //   validate: (email: string) => email.includes('@gmail.com'),
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/, // regular expression 으로도 검사 가능
            })} // register를 등록한 것만으로 react에 의해 컨트롤 되는 form이 생성됨
            name="email"
            type="email"
            placeholder="email"
          />
          {errors.email?.message && (
            <span className="font-bold text-red-600">
              {errors.email?.message}
            </span>
          )}
          {errors.email?.type === 'pattern' && (
            <span className="font-bold text-red-600">Only gmail allowed</span>
          )}
        </div>
        <div>
          <input
            ref={register({
              required: true,
            })}
            name="password"
            type="password"
            required
            placeholder="password"
          />
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
