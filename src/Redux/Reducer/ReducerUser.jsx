import { getFromStorage } from "../../localStorage";

const curUser = getFromStorage('curUser');
const initialState = curUser
  ? { ...curUser, isLogin: true }
  : {
      fullname: '',
      email: '',
      password: '',
      phone: '',
      isLogin: false,
    };

const ReducerUser = (state = initialState, action) => {
  switch (action.type) {
    case 'ON_LOGIN':
      return {
        ...state,
        fullname: action.user.fullname,
        email: action.user.email,
        password: action.user.password,
        phone: action.user.phone,
        isLogin: true,
      };

    case 'ON_LOGOUT':
      return {
        ...state,
        ...action.user,
      };

    default:
      return state;
  }
};

export default ReducerUser;
