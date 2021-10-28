
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import page1 from "./pages/page1";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <main>
      <Switch>
      <Route path="/" render={(props) => <Dashboard {...props} PageComponent={page1} />} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route path="/page1" component={page1} />
      </Switch>
    </main>

  
  );
}

export default App;
