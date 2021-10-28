import ClippedDrawer from "./layouts/Dashboard";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <main>
      <Switch>
      <Route path="/" component={ClippedDrawer} exact />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
      </Switch>
    </main>

  
  );
}

export default App;
