import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getFromStorage, saveToStorage } from '../utils/localStorage';
import './Auth.css';

function RegisterPage() {
  // Input States
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Error States
  const [errorFullname, setFullnameError] = useState(false);
  const [errorEmail, setEmailError] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [emailExisted, setEmailExisted] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [errorPasswordLength, setPasswordLengthError] = useState(false);
  const [errorPhone, setPhoneError] = useState(false);

  const navigate = useNavigate();

  const onChangeName = e => {
    setFullName(e.target.value);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const onChangePhone = e => {
    setPhone(e.target.value);
  };

  const handlerSignUp = async e => {
    e.preventDefault();
    // Reset error
    setFullnameError(false);
    setEmailError(false);
    setEmailRegex(false);
    setEmailExisted(false);
    setPasswordError(false);
    setPasswordLengthError(false);
    setPhoneError(false);

    // Validate fullname
    if (!fullname.trim()) return setFullnameError(true);

    // Validate email
    if (!email.trim()) return setEmailError(true);

    if (!validateEmail(email)) return setEmailRegex(true);

    // Kiểm tra email của newUser có trùng với các user đã có không
    const existedUsers = getFromStorage('usersArr') || [];
    const checkNewUser = existedUsers.find(user => user.email === email);
    // Báo lỗi nếu trùng email
    if (checkNewUser) return setEmailExisted(true);

    // Validate password
    if (!password) return setPasswordError(true);

    if (password.length < 8) return setPasswordLengthError(true);

    // Validate phone
    if (!phone.trim()) return setPhoneError(true);

    // Nếu tất cả thông tin hợp lệ thì lưu newUser vào local storage
    const newUser = {
      fullname,
      email,
      password,
      phone,
    };
    existedUsers.push(newUser);
    saveToStorage('usersArr', existedUsers);
    // Chuyển sang trang Sign In
    navigate('/login', {replace: true});
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
          <span className="login100-form-title p-b-33">Sign Up</span>
          {/* Error messages */}
          <div className="d-flex justify-content-center pb-5">
            {errorFullname && (
              <span className="text-danger">
                * Please Check Your Full Name!
              </span>
            )}
            {errorEmail && (
              <span className="text-danger">* Please Check Your Email!</span>
            )}
            {emailRegex && (
              <span className="text-danger">* Incorrect Email Format</span>
            )}
            {emailExisted && (
              <span className="text-danger">* Email already exists!</span>
            )}
            {errorPassword && (
              <span className="text-danger">* Please Check Your Password!</span>
            )}
            {errorPasswordLength && (
              <span className="text-danger">
                * Password must be more than 8 characters!
              </span>
            )}
            {errorPhone && (
              <span className="text-danger">
                * Please Check Your Phone Number!
              </span>
            )}
          </div>
          <form onSubmit={handlerSignUp}>
            {/* Fullname */}
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                value={fullname}
                onChange={onChangeName}
                type="text"
                placeholder="Full Name"
              />
            </div>
            {/* Email */}
            <div className="wrap-input100 rs1 validate-input">
              <input
                className="input100"
                value={email}
                onChange={onChangeEmail}
                type="text"
                placeholder="Email"
              />
            </div>
            {/* Password */}
            <div className="wrap-input100 rs1 validate-input">
              <input
                className="input100"
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder="Password"
              />
            </div>
            {/* Phone */}
            <div className="wrap-input100 rs1 validate-input">
              <input
                className="input100"
                value={phone}
                onChange={onChangePhone}
                type="text"
                placeholder="Phone"
              />
            </div>
            {/* Sign Up button */}
            <div className="container-login100-form-btn m-t-20">
              <button className="login100-form-btn">Sign Up</button>
            </div>
          </form>
          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Login?</span>
            &nbsp;
            <Link to="/login" className="txt2 hov1">
              Click
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
