export const userLogin = data => {
  return {
    type: 'ON_LOGIN',
    user: data,
  };
};

export const userLogout = () => {
  return {
    type: 'ON_LOGOUT',
    user: {
      fullname: '',
      email: '',
      password: '',
      phone: '',
      isLogin: false,
    },
  };
};
