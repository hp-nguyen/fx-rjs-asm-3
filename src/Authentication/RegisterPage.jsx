import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay cho Redirect
import './Auth.css';
import { getFromStorage, saveToStorage } from '../localStorage';
import alertify from 'alertifyjs';

function RegisterPage() {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [errorEmail, setEmailError] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [errorFullname, setFullnameError] = useState(false);
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

    if (!fullname) {
      setFullnameError(true);
      setEmailError(false);
      setPhoneError(false);
      setPasswordError(false);
      setEmailRegex(false);
      return;
    } else {
      setFullnameError(false);
      setPhoneError(false);
      setPasswordError(false);
      setEmailError(false);

      if (!email) {
        setFullnameError(false);
        setEmailError(true);
        setPhoneError(false);
        setPasswordError(false);
        return;
      } else {
        setEmailError(false);
        setPhoneError(false);
        setPasswordError(false);
        setFullnameError(false);

        if (!validateEmail(email)) {
          setEmailRegex(true);
          setFullnameError(false);
          setEmailError(false);
          setPhoneError(false);
          setPasswordError(false);
          return;
        } else {
          setEmailRegex(false);

          if (!password) {
            setFullnameError(false);
            setEmailError(false);
            setPhoneError(false);
            setPasswordError(true);
            return;
          } else {
            setFullnameError(false);
            setPhoneError(false);
            setPasswordError(false);
            setEmailError(false);

            if (!phone) {
              setFullnameError(false);
              setEmailError(false);
              setPhoneError(true);
              setPasswordError(false);
            } else {
              const newUser = {
                fullname: fullname,
                email: email,
                password: password,
                phone: phone,
              };
              // Kiểm tra newUser có trùng với các user đã có không
              const users = getFromStorage('usersArr') || [];
              const checkNewUser = users.find(
                user => user.email === newUser.email
              );
              if (checkNewUser) {
                alertify.set('notifier', 'position', 'bottom-left');
                alertify.error('Email already exists!');
                return;
              }
              // Lưu newUser vào local storage
              users.push(newUser);
              saveToStorage('usersArr', users);
              // Chuyển sang trang Sign In
              navigate('/login');
            }
          }
        }
      }
    }
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
            {errorPassword && (
              <span className="text-danger">* Please Check Your Password!</span>
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
