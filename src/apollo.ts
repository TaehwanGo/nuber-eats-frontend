import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { LOCALSTORAGE_TOKEN } from './constants';
import { setContext } from '@apollo/client/link/context'; // client의 모든 request에 context를 set

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token)); // localStorage에 저장된 jwt 을 default value로 setting
export const authToken = makeVar(token);

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // This gonna happen every request
  // console.log('headers:', headers);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-jwt': authToken() || '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
          token: {
            read() {
              return authToken();
            },
          },
        },
      },
    },
  }),
});
