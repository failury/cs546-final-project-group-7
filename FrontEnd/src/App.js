
import { Route, Redirect, Switch } from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from './components/RouteWithSubRoutes.js';
import nofound from './pages/nofound';
import React from 'react';
import SignIn from './pages/SignIn';

import useToken from './components/useToken';
import SignUp from './pages/SignUp';

function App() {
  const { token, setToken } = useToken();
  if (!token || token == "wrongusername" ) {
    
    return (
      <>
        <Switch>
        <Redirect exact from="/" to="/login" />
          <Route exact path="/login">
            <SignIn setToken={setToken} />
          </Route>
          <Route exact path="/signup">
            <SignUp setToken={setToken}/>
          </Route>
        </Switch>
      </>
    )
  }else{
  }
  return (
    <>
      <Switch>
        <Redirect exact from="/" to="/Dashboard" />
        <Redirect exact from="/login" to="/Dashboard" />
        <Redirect exact from="/signup" to="/Dashboard" />
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
        <Route component={nofound} />
      </Switch>
    </>


  );
}

export default App;


