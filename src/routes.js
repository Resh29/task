import { React, useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { Create } from './pages/CreatePage';
import { HomePage } from './pages/Home';
import { NoMatch } from './pages/NoMatch';
import { PersonalList } from './pages/PersonalList';
import { SinglePage } from './pages/SinglePage';

export const useRoutes = () => {
  const { state, isAdmin, changeToken } = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/" exact>
        {state ? <HomePage /> : <Redirect to="/auth" />}
      </Route>
      <Route path="/my_list" exact>
        {state ? <PersonalList /> : <Redirect to="/auth" />}
      </Route>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/task/:id">
        <SinglePage />
      </Route>

      <Route path="*" exact>
        <NoMatch />
      </Route>
    </Switch>
  );
};
