import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Restaurants } from '../pages/client/restaurant';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';
import { NotFound } from '../pages/404';

//<></> : fragment : parent없이 많은 element를 동시에 return 할 수 있게 됨
const ClientRoutes = [
  <Route key={1} path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
  <Route key={2} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={3} path="/edit-profile" exact>
    <EditProfile />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
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
      <Header />
      <Switch>
        {data.me.role === 'Client' && ClientRoutes}
        {/* <Redirect to="/" /> */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
