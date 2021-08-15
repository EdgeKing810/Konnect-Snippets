import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Create from './components/Create';
import View from './components/View';

function App() {
  return (
    <div className="w-full">
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Create />
        </Route>

        <Route exact path="/snp/:snippetLink">
          <Navbar />
          <View />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
