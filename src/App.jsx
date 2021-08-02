import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import OrderForm from './components/Order/OrderForm';
import MastersList from './components/Admin/master.list/MastersList'
import MasterController from './components/Admin/master.controller/MasterController'
import UserList from './components/Admin/user.list/UserList';
import UserController from './components/Admin/user.controller/UserController';


const ROUTES = {
  ORDER: {
    path: "/order",
    component: OrderForm
  },
  ADMIN_MASTERS_LIST: {
    path:"/admin/masters-list",
    component: MastersList
  },
  ADMIN_MASTER_CONTROLLER: {
    path: "/admin/master-controller/:propsMasterId?/:propsMasterName?/:propsCityId?",
    component: MasterController
  },
  ADMIN_USER_LIST: {
    path: "/admin/users-list",
    component: UserList
  }, 
  ADMIN_USER_CONTROLLER: {
    path: "/admin/user-controller/:propsUserId?/:propsUserName?/:propsUserEmail?",
    component: UserController
  }
  
} 


function App() {
  return (
    <BrowserRouter> 
      <Switch>
        <Route {...ROUTES.ORDER} />
        <Route {...ROUTES.ADMIN_MASTERS_LIST}/>
        <Route {...ROUTES.ADMIN_MASTER_CONTROLLER}/>
        <Route {...ROUTES.ADMIN_USER_LIST}/>
        <Route {...ROUTES.ADMIN_USER_CONTROLLER}/>
      </Switch> 
    </BrowserRouter>
      
  );
}

export default App;
