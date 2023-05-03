import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>



          <Route exact path='/'>
            <Landing />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
