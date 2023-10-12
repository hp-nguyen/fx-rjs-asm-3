const initialState = {
  isShow: false,  // State ban đầu là false để ẩn Popup
  product: null, // Sản phẩm ban đầu là null
};

const ReducerPopup = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_POPUP':
      return {
        ...state,
        isShow: action.isShow,
        product: action.product, 
      };
    case 'HIDE_POPUP':
      return {
        ...state,
        isShow: action.isShow,
        product: action.product,
      };
    default:
      return state;
  }
};

export default ReducerPopup;
