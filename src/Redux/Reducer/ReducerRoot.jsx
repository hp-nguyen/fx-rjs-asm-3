import { combineReducers } from 'redux';
import ReducerCart from './ReducerCart';
import ReducerPopup from './ReducerPopup';
import ReducerUser from './ReducerUser';

const ReducerRoot = combineReducers({
  Cart: ReducerCart,
  Popup: ReducerPopup,
  User: ReducerUser,
});

export default ReducerRoot;
