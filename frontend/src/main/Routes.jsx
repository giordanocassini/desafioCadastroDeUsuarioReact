import React from "react";
import {Switch, Route, Redirect} from 'react-router';

import Home from '../components/home/Home';
import CustomerCrud from "../components/customers/CustomerCrud";
import NewUser from "../components/users/NewUser"

export default props =>
    <Switch>
        <Route exact path ='/' component={Home} />
        <Route path ='/customers' component={CustomerCrud} />
        <Route path ='/new-user' component={NewUser} />
        <Redirect from='*' to='/' />
    </Switch>