import alertify from 'alertifyjs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../Redux/Action/ActionCart';
import { userLogin } from '../Redux/Action/ActionUser';
import { getFromStorage, saveToStorage } from '../utils/localStorage';
import './Auth.css';

function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    // Reset error states
    setErrorEmail(false);
    setEmailRegex(false);
    setErrorPassword(false);

    // Validate input
    if (!email.trim()) return setErrorEmail(true);
    if (!validateEmail(email)) return setEmailRegex(true);
    if (!password) return setErrorPassword(true);

    // Kiểm tra email login có khớp với user nào không
    const users = getFromStorage('usersArr') || [];
    const curUser = users.find(user => {
      return user.email === email;
    });
    // Nếu không có email nào khớp thì báo lỗi
    if (!curUser) return setErrorEmail(true);

    // Nếu khớp email thì check password
    if (curUser.password !== password) {
      setErrorPassword(true); // Báo lỗi nếu sai password
      setPassword(''); // Reset password khi nhập sai
      return;
    }
    // Nếu email và password đều đúng thì xác nhận login
    saveToStorage('curUser', curUser); // Lưu curUser vào storage
    dispatch(userLogin(curUser)); // Update User state trong Redux
    dispatch(addUser(curUser)); // Update Cart state theo curUser trong Redux

    alertify.set('notifier', 'position', 'bottom-left');
    alertify.success('Login successfully!');

    navigate('/', { replace: true }); // redirect to the home page
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Sign In</span>
          {/* Error messages */}
          <div className="d-flex justify-content-center pb-5">
            {emailRegex && (
              <span className="text-danger">* Incorrect Email Format</span>
            )}
            {errorEmail && (
              <span className="text-danger">* Please Check Your Email</span>
            )}
            {errorPassword && (
              <span className="text-danger">* Please Check Your Password</span>
            )}
          </div>
          <form onSubmit={onSubmit}>
            {/* Email */}
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                placeholder="Email"
                value={email}
                onChange={onChangeEmail}
              />
            </div>
            {/* Password */}
            <div className="wrap-input100 rs1 validate-input">
              <input
                className="input100"
                type="password"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            {/* Sign In button */}
            <div className="container-login100-form-btn m-t-20">
              <button className="login100-form-btn" type="submit">
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <Link to="/register" className="txt2 hov1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
