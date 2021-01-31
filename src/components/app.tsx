import { useReactiveVar } from '@apollo/client'; // gql, useQuery,
import React from 'react';
import { isLoggedInVar } from '../apollo';
import { LoggedInRouter } from '../routers/logged-in-router';
import { LoggedOutRouter } from '../routers/logged-out-router';

// const IS_LOGGED_IN = gql`
//   query isLoggedIn {
//     isLoggedIn @client
//   }
// `;

export const App = () => {
  // useQuery() : react-hooks 의 한 종류, for graphql
  // const {
  //   data: { isLoggedIn },
  // } = useQuery(IS_LOGGED_IN); // app은 언제나 user가 logged in 상태인지를 묻고 로그인 상태에 맞는 라우터를 보여줌
  const isLoggedIn = useReactiveVar(isLoggedInVar); // hooks(useReactiveVar)를 사용해서 gql 쿼리를 직접 작성하지 않고 state를 확인

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};
