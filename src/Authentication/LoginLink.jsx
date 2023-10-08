import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogout } from '../Redux/Action/ActionUser';

function LoginLink(props) {
  const dispatch = useDispatch();

  const onRedirect = () => {
    dispatch(userLogout());
    localStorage.removeItem('curUser');
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/login" reloadDocument>
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
