import React from 'react';
import { NavLink } from 'react-router-dom';

function LogoutLink(props) {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={`/login`}>
        <i className="fas fa-user-alt mr-1 text-gray"></i>Login
      </NavLink>
    </li>
  );
}

export default LogoutLink;
