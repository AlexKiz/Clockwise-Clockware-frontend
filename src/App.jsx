import React from 'react';
import logo from './logo.svg';
import './App.css';
import OrderForm from './components/Order/OrderForm';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import MasterController from './components/Admin/master.controller/MasterController'

const ROUTES = {
  ORDER: {
    path: "/order",
    component: OrderForm
  },
  ADMIN_MASTER: {
    path: "/admin/master",
    component: MasterController
  }
} 

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route {...ROUTES.ORDER} />
        <Route {...ROUTES.ADMIN_MASTER}/>
      </Switch> 
    </BrowserRouter>
      
    
  );
}

export default App;
