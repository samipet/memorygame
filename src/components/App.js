import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import GamePage from './gamePage';
import StartPage from './startPage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={StartPage} />
        <Route path="/gamepage" component={GamePage} />
      </div>
    </BrowserRouter>
  )
}

export default App;
