import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { NotFound } from '../pages/404';
import { Restaurants } from '../pages/client/restaurant';
import { meQuery } from '../__generated__/meQuery';

//<></> : fragment : parent없이 많은 element를 동시에 return 할 수 있게 됨
const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  // console.log(error);
  // console.log(data?.me.role);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        {data.me.role === 'Client' && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
