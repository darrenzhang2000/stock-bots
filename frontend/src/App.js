import React from 'react'
import './App.css';
import Signup from './components/signup/signup';
import Signin from './components/signin/signin';
import { Route } from 'react-router-dom';
import Header from './components/header/header'
import Footer from './components/footer/footer'
import StockPage from './screens/stockPage/stockPage'
import TransactionPage from './screens/transactionPage/transactionPage';
import PortfolioPage from './screens/portfolioPage/portfolioPage';
import AppBar from '@mui/material/AppBar';
import Home from './screens/home/home';


function App() {
  return (
    <div>
      <Header />
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/signin' component={Signin} />
      <Route exact path='/stockPage' component={StockPage} />
      <Route exact path='/transactionsPage' component={TransactionPage} />
      <Route exact path='/portfolioPage' component={PortfolioPage} />
      <Footer />

    </div>
  );
}

export default App;
