import React from 'react'
import './App.css';
import Signup from './components/signup/signup';
import Signin from './components/signin/signin';
import { Route } from 'react-router-dom';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import StockPage from './screens/stockPage/stockPage'

function App() {
  return (
    <div>
      <Header />
      <Route exact path='/' component={Signup}/>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/signin' component={Signin}/>
      <Route exact path='/stockPage' component={StockPage}/>
      <Footer />
    </div>
  );
}

export default App;
