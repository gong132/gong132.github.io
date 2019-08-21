import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Layouts from './components/layouts/layouts'
import Login from './components/login/login'
function App() {
  return (
    <Router>
      <Switch>
        <Route path ='/login' component = {Login} ></Route>
        <Route path = '/index' component = {Layouts}></Route>
        <Redirect to = '/login'></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
