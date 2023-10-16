import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import convertMoney from '../../utils/convertMoney';

Products.propTypes = {
  products: PropTypes.array,
  sort: PropTypes.string,
};

Products.defaultProps = {
  products: [],
  sort: '',
};

function Products(props) {
  const { products, sort } = props;
  let sortProducts = [...products];
  switch (sort) {
    case 'DownToUp':
      sortProducts.sort((a, b) => a.price - b.price);
      break;
    case 'UpToDown':
      sortProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      sortProducts = [...products]
  }
  
  return (
    <div className="row">
      {/* Products */}
      {sortProducts &&
        sortProducts.map(value => (
          <div
            className="col-lg-4 col-sm-6 Section_Category"
            key={value._id.$oid}>
            <div className="product text-center">
              <div className="position-relative mb-3">
                <div className="badge text-white badge-"></div>
                <Link className="d-block" to={`/detail/${value._id.$oid}`}>
                  <img className="img-fluid w-100" src={value.img1} alt="..." />
                </Link>
                <div className="product-overlay">
                  <ul className="mb-0 list-inline"></ul>
                </div>
              </div>
              <h6>
                <a className="reset-anchor" href="detail.html">
                  {value.name}
                </a>
              </h6>
              <p className="small text-muted">
                {convertMoney(value.price)} VND
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Products;
