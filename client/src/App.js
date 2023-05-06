import './App.css';
import { Route, Switch } from "react-router-dom";
import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Landing from './views/Landing/Landing';
import Details from './views/Details/Details';

function App() {
  return (
    <>
        <NavBar />
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/details/:pokemon'>
            <Details />
          </Route>



          <Route exact path='/'>
            <Landing />
          </Route>
        </Switch>
    </>
  );
}

export default App;
