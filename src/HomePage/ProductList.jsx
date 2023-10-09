import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = ({ products, openModal, convertMoney }) => {
  return (
    <section className="py-5" id="section_product">
      <header>
        <p className="small text-muted small text-uppercase mb-1">
          Made the hard way
        </p>
        <h2 className="h5 text-uppercase mb-4">Top trending products</h2>
      </header>
      <Container>
        <Row>
          {products &&
            products.map(product => (
              <Col xl={3} lg={4} sm={6} key={product._id.$oid}>
                <div className="product text-center">
                  <div className="position-relative mb-3">
                    <div className="badge text-white badge-"></div>
                    <a
                      className="d-block"
                      href={`#product_${product._id.$oid}`}
                      onClick={() => openModal(product)}>
                      <img className="img-fluid" src={product.img1} alt="" />
                    </a>
                    <div className="product-overlay">
                      <ul className="mb-0 list-inline">
                        <li className="list-inline-item m-0 p-0">
                          <a className="btn btn-sm btn-outline-dark" href="#">
                            <i className="far fa-heart"></i>
                          </a>
                        </li>
                        <li className="list-inline-item m-0 p-0">
                          <Link
                            className="btn btn-sm btn-dark"
                            to={`/detail/${product._id.$oid}`}>
                            Add to cart
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h6>
                    <Link className="reset-anchor" to={`/detail/${product._id.$oid}`}>
                      {product.name}
                    </Link>
                  </h6>
                  <p className="small text-muted">
                    {convertMoney(product.price)} VND
                  </p>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  );
};

export default ProductList;
