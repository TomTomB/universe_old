import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Universe = () => {
  return (
    <div>
      <h1>Universe</h1>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Universe} />
      </Switch>
    </Router>
  );
}
