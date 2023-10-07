import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Name() {
  const name = useSelector(state => state.User.fullname);
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        style={{ cursor: 'pointer' }}
        id="pagesDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <i className="fas fa-user-alt mr-1 text-gray"></i>
        {name}
      </a>
      <div className="dropdown-menu mt-3" aria-labelledby="pagesDropdown">
        <Link
          className="dropdown-item border-0 transition-link"
          to={'/history'}>
          History
        </Link>
      </div>
    </li>
  );
}

export default Name;
