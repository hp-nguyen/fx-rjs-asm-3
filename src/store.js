import { createStore } from 'redux';
import ReducerRoot from './Redux/Reducer/ReducerRoot';
import { getFromStorage, saveToStorage } from './utils/localStorage';

const store = createStore(ReducerRoot);
store.subscribe(() => {
  // Update curListCart vào local storage
  const curListCart = getFromStorage('listCart') || [];
  const curCart = store.getState().Cart;
  if (curListCart.length < 1) {
    curListCart.push(curCart);
  } else {
    const findCartIndex = curListCart.findIndex(
      cart => cart.email === curCart.email
    );
    if (findCartIndex < 0) {
      curListCart.push(curCart);
    } else {
      curListCart[findCartIndex].cart = curCart.cart;
    }
  }
  saveToStorage('listCart', curListCart);
});
export default store;
