import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { EMAIL_REGEX } from '../../constants';
import { useMe } from '../../hooks/useMe';
import {
  editProfile,
  editProfileVariables,
} from '../../__generated__/editProfile';

interface IFormProps {
  email?: string;
  password?: string;
}

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

export const EditProfile = () => {
  const { data: userData } = useMe();
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    defaultValues: {
      email: userData?.me.email,
    },
    mode: 'onChange',
  });
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok) {
      // update cache
      // let's make it happen on #16.4
    }
  };
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, { onCompleted });

  const onSubmit = () => {
    // getValues 후 edit profile mutation을 call
    // 그리고 cache도 update : 나중에 다른 스크린에 필요할 수도 있으므로
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== '' && { password }), // 아무것도 입력안해서 password에 ""들어간 경우 password 항목자체가 없게 해서 ""으로 password가 변경되는 것을 막아줌
        },
      },
    });
  };
  return (
    <div className="w-full flex flex-col px-5 items-center">
      <div className="w-full max-w-screen-sm ">
        <h4 className="w-full font-medium text-left text-3xl mb-5">
          Edit Profile
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            ref={register({
              pattern: EMAIL_REGEX,
            })}
            name="email"
            className="input"
            type="email"
            placeholder="Email"
          />
          <input
            ref={register}
            name="password"
            className="input"
            type="password"
            placeholder="Password"
          />
          <Button
            loading={loading}
            canClick={formState.isValid}
            actionText="Save Profile"
          />
        </form>
      </div>
    </div>
  );
};
