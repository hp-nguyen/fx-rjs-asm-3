import alertify from 'alertifyjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCart, updateCart } from '../Redux/Action/ActionCart';
import convertMoney from '../convertMoney';
import ListCart from './Component/ListCart';

function CartPage() {
  const cart = useSelector(state => state.Cart.cart);
  const dispatch = useDispatch();

  const [total, setTotal] = useState();

  function getTotal(cart) {
    let sub_total = 0;
    cart.map(product => {
      return (sub_total +=
        parseInt(product.priceProduct) * parseInt(product.count));
    });

    setTotal(sub_total);
  }
  useEffect(() => {
    getTotal(cart);
  }, [cart]);

  const onDeleteCart = (getUser, getProduct) => {
    const data = {
      idProduct: getProduct,
      idUser: getUser,
    };

    //Đưa dữ liệu vào Redux
    const action = deleteCart(data);
    dispatch(action);

    alertify.set('notifier', 'position', 'bottom-left');
    alertify.error('Bạn Đã Xóa Hàng Thành Công!');
  };

  const onUpdateCount = (getUser, getProduct, getCount) => {
    //Nếu không có phiên làm việc của Session User thì mình sẽ xử lý với Redux
    const data = {
      idProduct: getProduct,
      idUser: getUser,
      count: getCount,
    };

    //Đưa dữ liệu vào Redux
    const action = updateCart(data);
    dispatch(action);

    alertify.set('notifier', 'position', 'bottom-left');
    alertify.success('Bạn Đã Sửa Hàng Thành Công!');
  };

  // Use the `useNavigate` hook to navigate programmatically
  const navigate = useNavigate();

  const onCheckout = () => {
    if (cart.length === 0) {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('Vui Lòng Kiểm Tra Lại Giỏ Hàng!');
      return;
    }

    // Use the `navigate` function to navigate to the checkout page
    navigate('/checkout');
  };

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Cart</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    Cart
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <ListCart
              cart={cart}
              onDeleteCart={onDeleteCart}
              onUpdateCount={onUpdateCount}
            />

            <div className="bg-light px-4 py-3">
              <div className="row align-items-center text-center">
                <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                  <Link
                    className="btn btn-link p-0 text-dark btn-sm"
                    to={`/shop`}>
                    <i className="fas fa-long-arrow-alt-left mr-2"> </i>
                    Continue shopping
                  </Link>
                </div>
                <div className="col-md-6 text-md-right">
                  <span
                    className="btn btn-outline-dark btn-sm"
                    onClick={onCheckout}>
                    Proceed to checkout
                    <i className="fas fa-long-arrow-alt-right ml-2"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 rounded-0 p-lg-4 bg-light">
              <div className="card-body">
                <h5 className="text-uppercase mb-4">Cart total</h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center justify-content-between">
                    <strong className="text-uppercase small font-weight-bold">
                      Subtotal
                    </strong>
                    <span className="text-muted small">
                      {convertMoney(total)} VND
                    </span>
                  </li>
                  <li className="border-bottom my-2"></li>
                  <li className="d-flex align-items-center justify-content-between mb-4">
                    <strong className="text-uppercase small font-weight-bold">
                      Total
                    </strong>
                    <span>{convertMoney(total)} VND</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CartPage;
