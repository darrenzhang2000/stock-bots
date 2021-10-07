import React from 'react'
import './App.css';
import Signup from './components/signup/signup';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Route exact path='/signup' component={Signup}/>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
