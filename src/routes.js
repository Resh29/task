import { React } from 'react';
import { Route, Switch } from 'react-router-dom';

import { AuthPage } from './pages/AuthPage';
import { Create } from './pages/CreatePage';
import { HomePage } from './pages/Home';
import { NoMatch } from './pages/NoMatch';
import { PersonalList } from './pages/PersonalList';
import { SinglePage } from './pages/SinglePage';
import { AllTasks } from './pages/AllTasks';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/my-list" exact>
        <PersonalList />
      </Route>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/all">
        <AllTasks />
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
