import React from 'react';
import logo from './logo.svg';
import './App.css';
import OrderForm from './components/Order/OrderForm';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/order' component={OrderForm} />
      </Switch> 
    </BrowserRouter>
      
    
  );
}

export default App;
