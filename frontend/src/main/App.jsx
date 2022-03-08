import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from '../components/users/RequireAuth';


import Logo from '../components/template/Logo';
import Nav from '../components/template/Nav';
import Footer from '../components/template/Footer';

import Layout from '../components/Layout';
import Home from '../components/home/Home';
import CustomerCrud from "../components/customers/CustomerCrud";
import Register from "../components/users/Register.js"
import Login from "../components/users/Login.js"

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route element={<RequireAuth />}>
                    <Route path='customers' element={<CustomerCrud />} />
                </Route>
                <Route path="*" element={<Home />} />
            </Route>
        </Routes>
        <Footer />
    </div>