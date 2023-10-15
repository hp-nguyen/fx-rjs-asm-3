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
  // Cart đang chứa tất cả sp hiện tại
  const curCart = [...state.cart];

  switch (action.type) {
    // Lấy dữ liệu cart khi user login
    case 'ADD_USER':
      const curUser = action.data;
      const curCartData = storageListCart.find(
        cartData => curUser.email === cartData.email
      ) || { cart: [] };
      return { ...state, email: curUser.email, cart: curCartData.cart };

    case 'ADD_CART':
      //Lấy dữ liệu product được truyền tới
      const dataAddProduct = action.data;

      if (curCart.length < 1) {
        curCart.push(dataAddProduct);
      } else {
        //Tìm Vị Trí của sản phẩm đã mua
        const indexProduct = curCart.findIndex(product => {
          return product.idProduct === dataAddProduct.idProduct;
        });
        //Nếu sp chưa được mua thì push vào
        //Còn đã từng mua rồi thì update tại vị trí index đã tìm được
        if (indexProduct < 0) {
          curCart.push(dataAddProduct);
        } else {
          curCart[indexProduct].count =
            parseInt(curCart[indexProduct].count) +
            parseInt(dataAddProduct.count);
        }
      }

      return { ...state, cart: curCart };

    case 'DELETE_CART':
      //Lấy dữ liệu được truyền tới
      const dataDeleteProduct = action.data;

      //Tìm kiểm vị trí cần xóa
      const indexDelete = curCart.findIndex(product => {
        return product.idProduct === dataDeleteProduct.idProduct;
      });

      //Xóa theo vị trí
      curCart.splice(indexDelete, 1);
      return {
        ...state,
        cart: curCart,
      };

    case 'UPDATE_CART':
      const dataUpdateProduct = action.data;

      const index = curCart.findIndex(product => {
        return product.idProduct === dataUpdateProduct.idProduct;
      });
      curCart[index].count = dataUpdateProduct.count;

      return {
        ...state,
        cart: curCart,
      };

    default:
      return state;
  }
};

export default ReducerCart;
