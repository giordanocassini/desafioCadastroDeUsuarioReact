import React from "react";
import {Switch, Route, Redirect} from 'react-router';

import Home from '../components/home/Home';
import CustomerCrud from "../components/customers/CustomerCrud";
import Register from "../components/users/Register.js"
import Login from "../components/users/Login.js"

export default props =>
    <Switch>
        <Route exact path ='/' component={Home} />
        <Route path ='/customers' component={CustomerCrud} />
        <Route path ='/register' component={Register} />
        <Route path ='/login' component={Login} />
        <Redirect from='*' to='/' />
    </Switch>