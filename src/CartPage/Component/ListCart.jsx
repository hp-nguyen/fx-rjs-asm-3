import React from 'react';
import { Link } from 'react-router-dom';
import convertMoney from '../../convertMoney';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, updateCart } from '../../Redux/Action/ActionCart';

function ListCart(props) {
  const curCart = useSelector(state => state.Cart.cart)
  const dispatch = useDispatch();

  return (
    <div className="table-responsive mb-4">
      <table className="table">
        <thead className="bg-light">
          <tr className="text-center">
            <th className="border-0" scope="col">
              <strong className="text-small text-uppercase">Image</strong>
            </th>
            <th className="border-0" scope="col">
              <strong className="text-small text-uppercase">Product</strong>
            </th>
            <th className="border-0" scope="col">
              <strong className="text-small text-uppercase">Price</strong>
            </th>
            <th className="border-0" scope="col">
              <strong className="text-small text-uppercase">Quantity</strong>
            </th>
            <th className="border-0" scope="col">
              <strong className="text-small text-uppercase">Total</strong>
            </th>
            <th className="border-0" scope="col">
              <strong className="text-small text-uppercase">Remove</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {curCart &&
            curCart.map(product => (
              <tr className="text-center" key={product.idProduct}>
								{/* Img */}
                <td className="pl-0 border-0">
                  <div className="media align-items-center justify-content-center">
                    <Link
                      className="reset-anchor d-block animsition-link"
                      to={`/detail/${product.idProduct}`}>
                      <img
                        src={product.img}
                        alt={product.nameProduct}
                        width="70"
                      />
                    </Link>
                  </div>
                </td>
								{/* Name */}
                <td className="align-middle border-0">
                  <div className="media align-items-center justify-content-center">
                    <Link
                      className="reset-anchor h6 animsition-link"
                      to={`/detail/${product.idProduct}`}>
                      {product.nameProduct}
                    </Link>
                  </div>
                </td>
								{/* Price */}
                <td className="align-middle border-0">
                  <p className="mb-0 small">
                    {convertMoney(product.priceProduct)} VND
                  </p>
                </td>
								{/* Amount */}
                <td className="align-middle border-0">
                  <div className="quantity justify-content-center">
                    <button
                      className="dec-btn p-0"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (product.count === 1) return;
                        dispatch(
                          updateCart({ ...product, count: product.count - 1 })
                        );
                      }}>
                      <i className="fas fa-caret-left"></i>
                    </button>
                    <input
                      className="form-control form-control-sm border-0 shadow-0 p-0"
                      type="text"
                      value={product.count}
                      onChange={() => {}}
                    />
                    <button
                      className="inc-btn p-0"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        dispatch(
                          updateCart({ ...product, count: product.count + 1 })
                        )
                      }>
                      <i className="fas fa-caret-right"></i>
                    </button>
                  </div>
                </td>
								{/* Total */}
                <td className="align-middle border-0">
                  <p className="mb-0 small">
                    {convertMoney(
                      parseInt(product.priceProduct) * parseInt(product.count)
                    )}{' '}
                    VND
                  </p>
                </td>
								{/* Delete product button */}
                <td className="align-middle border-0">
                  <button
                    className="reset-anchor remove_cart"
										onClick={() => dispatch(deleteCart(product))}
										>
                    <i className="fas fa-trash-alt small text-muted"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCart;
