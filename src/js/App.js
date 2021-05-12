import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import SignIn from './components/signIn';
import Dashboard from './components/dashBoard';

export default function App() {
  return (
    <>
      <HashRouter>
        <div>
          <Route path="/" exact component={SignIn} />
          <Route path="/dashBoard" component={Dashboard} />
        </div>
      </HashRouter>
    </>
  );
}
