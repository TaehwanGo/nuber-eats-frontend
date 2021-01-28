import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Restaurants } from '../pages/client/restaurant';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';
import { NotFound } from '../pages/404';
import { Search } from '../pages/client/search';
import { Category } from '../pages/client/category';

//<></> : fragment : parent없이 많은 element를 동시에 return 할 수 있게 됨
const ClientRoutes = [
  <Route key={1} path="/confirm">
    <ConfirmEmail />
  </Route>,
  <Route key={2} path="/" exact>
    <Restaurants />
  </Route>,
  <Route key={3} path="/edit-profile">
    <EditProfile />
  </Route>,
  <Route key={4} path="/search">
    <Search />
  </Route>,
  <Route key={5} path="/category/:slug">
    <Category />
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
