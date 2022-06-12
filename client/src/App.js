import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import FlipGame from './pages/FlipGame';
import Login from './pages/Login';
import OldOrNew from './pages/OldOrNew';
import FarleySays from './pages/FarleySays';
import SoundGame from './pages/SoundGame';
import NumberGame from './pages/NumberGame';
import Profile from './pages/Profile'
import GamePage from './pages/GamePage';



function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile/me' component={Profile} />
          <Route exact path='/game/:gameId' component={GamePage} />
          <Route exact path='/game/oldornew/:gameId' component={OldOrNew} />
          <Route exact path='/game/matchcards/:gameId' component={FlipGame} />
          <Route exact path='/game/©farleysays/:gameId' component={FarleySays} />
          <Route exact path='/game/soundsequence/:gameId' component={SoundGame} />
          <Route exact path='/game/numbergame/:gameId' component={NumberGame} />
        </Switch>
      </>
    </Router>
  );
}



export default App;