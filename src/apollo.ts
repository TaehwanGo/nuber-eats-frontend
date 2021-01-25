import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar(false);

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // backend uri
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            // reactive variable을 사용하면 field name을 기억할 필요도 없네
            read() {
              // field의 값을 반환하는 함수
              return isLoggedInVar(); // Boolean(localStorage.getItem('token')); // local storage에 token이 있을 때엔 우리가 logged in 되었다는 것을 알려줌
            },
          },
        },
      },
    },
  }),
});
