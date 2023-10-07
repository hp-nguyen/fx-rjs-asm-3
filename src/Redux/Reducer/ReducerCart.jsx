import { getFromStorage } from '../../localStorage';
const curUser = getFromStorage('curUser');
const storageListCart = getFromStorage('listCart') || [];
let curCartData;
if (curUser) {
  curCartData = storageListCart.find(
    cartData => curUser.email === cartData.email
  ) || { cart: [] };
} else {
  curCartData = { cart: [] };
}
const initalState = {
  email: curUser?.email,
  cart: curCartData.cart,
};

const ReducerCart = (state = initalState, action) => {
  switch (action.type) {
    //Nhận dữ liệu id_user và thay đổi state
    case 'ADD_USER':
      const curUser = action.data;
      const curCartData = storageListCart.find(
        cartData => curUser.email === cartData.email
      ) || { cart: [] };
      return { ...state, email: curUser.email, cart: curCartData.cart };

    case 'ADD_CART':
      //Lấy dữ liệu được truyền tới
      const product = action.data;

      //Lấy dữ liệu có sẵn trong state
      const curState = { ...state };
      if (curState.cart.length < 1) {
        curState.cart.push(product);
      } else {
        //Tìm Vị Trí của sản phẩm đã mua
        const indexProduct = curState.cart.findIndex(value => {
          return value.idProduct === product.idProduct;
        });
        //Nếu này chưa được mua thì mình push vào
        //Còn đã từng mua rồi thì mình update tại vị trí indexCart mà mình vừa tìm được
        if (indexProduct < 0) {
          curState.cart.push(product);
        } else {
          curState.cart[indexProduct].count =
            parseInt(curState.cart[indexProduct].count) +
            parseInt(product.count);
        }
      }

      return { ...state, cart: curState.cart };

    case 'DELETE_CART':
      //Lấy dữ liệu được truyền tới
      const data_delete_cart = action.data;
      //Lấy dữ diệu có sẵn trong state
      const delete_cart = [...state.cart];

      //Tìm kiểm vị trí mà cần xóa
      const indexDelete = delete_cart.findIndex(value => {
        return value.idProduct === data_delete_cart.idProduct;
      });

      //Xóa theo vị trí
      delete_cart.splice(indexDelete, 1);
      return {
        ...state,
        cart: delete_cart,
      };

    case 'UPDATE_CART':
      const data_update_cart = action.data;

      const update_cart = [...state.cart];

      const index = update_cart.findIndex(value => {
        return value.idProduct === data_update_cart.idProduct;
      });
      update_cart[index].count = data_update_cart.count;

      return {
        ...state,
        cart: update_cart,
      };

    default:
      return state;
  }
};

export default ReducerCart;
