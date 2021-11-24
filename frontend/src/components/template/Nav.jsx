import './Nav.css';
import NavItem from './NavItem';
import React from 'react';

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <NavItem url="/" icon="home" title="Início"></NavItem>
            <NavItem url="/customers" icon="users" title="Clientes"></NavItem>
        </nav>
    </aside>