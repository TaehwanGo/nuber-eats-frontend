import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMe } from '../../hooks/useMe';
import {
  verifyEmail,
  verifyEmailVariables,
} from '../../__generated__/verifyEmail';

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData, refetch } = useMe();
  const client = useApolloClient();
  const history = useHistory();
  const onCompleted = async (data: verifyEmail) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      // client.writeFragment({
      //   id: `User:${userData.me.id}`,
      //   fragment: gql`
      //     fragment VerifiedUser on User {
      //       verified
      //     }
      //   `,
      //   data: {
      //     verified: true,
      //   },
      // });
      await refetch();
      history.push('/');
    }
  };
  const [verifyEmail] = useMutation<verifyEmail, verifyEmailVariables>(
    VERIFY_EMAIL_MUTATION,
    {
      onCompleted,
    },
  );
  //   const location = useLocation();
  useEffect(() => {
    // 방법 1. window.location.href 에서 url을 가져올 수도 있음
    // console.log(window.location.href.split("code=")[1]);
    // 방법 2. router로 부터 가져오기
    // console.log(location);
    const [_, code] = window.location.href.split('code=');
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, []);
  return (
    <div className="mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className="text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
