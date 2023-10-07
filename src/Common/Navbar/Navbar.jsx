import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap'; // Import React Bootstrap components
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginLink from '../../Authentication/LoginLink';
import LogoutLink from '../../Authentication/LogoutLink';
import Name from '../../Authentication/Name';

function CustomNavbar(props) {
  const [active, setActive] = useState('Home');

  const curUser = useSelector(state => state.User);
  const [loginUser, setLoginUser] = useState(false);
  const [nameUser, setNameUser] = useState(false);

  useEffect(() => {
    if (!curUser.isLogin) {
      setLoginUser(false);
      setNameUser(false);
    } else {
      setLoginUser(true);
      setNameUser(true);
    }
  }, [curUser]);

  const handlerActive = value => {
    setActive(value);
  };

  return (
    <div className="container px-0 px-lg-3">
      <Navbar bg="navbar-light" expand="lg" className="py-3 px-lg-0">
        <Navbar.Brand
          as={Link}
          to={`/`}
          className="font-weight-bold text-uppercase text-dark">
          Boutique
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        <Navbar.Collapse id="navbarNavAltMarkup">
          <Nav className="mr-auto">
            <Nav.Item onClick={() => handlerActive('Home')}>
              <Nav.Link
                as={Link}
                to={`/`}
                className={`nav-link ${active === 'Home' ? 'active' : ''}`}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => handlerActive('Shop')}>
              <Nav.Link
                as={Link}
                to={`/shop`}
                className={`nav-link ${active === 'Shop' ? 'active' : ''}`}>
                Shop
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link as={Link} to={`/cart`}>
                <i className="fas fa-dolly-flatbed mr-1 text-gray"></i> Cart
              </Nav.Link>
            </Nav.Item>
            {nameUser && <Name />}
            {loginUser ? <LoginLink /> : <LogoutLink />}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
