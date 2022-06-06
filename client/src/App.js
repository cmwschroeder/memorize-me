import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import Games from './pages/Games';
import FlipGame from './pages/FlipGame;
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/games' component={Games} />
          <Route exact path='/games/game1' component={FlipGame} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </>
    </Router>
  );
}

export default App;