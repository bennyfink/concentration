import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Concentration from './main.jsx';
import Play from './genGrid.jsx';
import Leader from './leader.jsx';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/templates/' component={Concentration}></Route>
      <Route exact path='/templates/play.html' component={Play}></Route>
      <Route exact path='/templates/leaderboard.html' component={Leader}></Route>
    </Switch>
  );
}

export default Main;