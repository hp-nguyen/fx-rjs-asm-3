import { combineReducers } from 'redux';
import ReducerCart from './ReducerCart';
import ReducerSession from './ReducerSession';
import ReducerPopup from './ReducerPopup';
import ReducerUser from './ReducerUser';

const ReducerRoot = combineReducers({
  Cart: ReducerCart,
  Session: ReducerSession,
  Popup: ReducerPopup,
  User: ReducerUser,
});

export default ReducerRoot;
