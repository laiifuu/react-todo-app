import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
    <h1>todos</h1>
  </header>
);

export default Header;
