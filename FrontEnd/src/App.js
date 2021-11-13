
import { Route,Redirect, Switch } from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from './components/RouteWithSubRoutes.js';
import nofound from './pages/nofound';
function App() {
  return (
    <>
      <Switch>
      <Redirect exact from="/" to="/Dashboard" />
        {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
        ))}
        <Route component={nofound} />
      </Switch>
    </>

  
  );
}

export default App;


