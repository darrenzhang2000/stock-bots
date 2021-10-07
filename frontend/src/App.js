import React from 'react'
import './App.css';
import Signup from './components/signup/signup';
import Signin from './components/signin/signin';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/signin' component={Signin}/>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
