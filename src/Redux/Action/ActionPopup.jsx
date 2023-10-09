export const showPopup = product => ({
  type: 'SHOW_POPUP',
  isShow: true,
  product,
});

export const hidePopup = () => ({
  type: 'HIDE_POPUP',
  isShow: false,
  product: null,
});
