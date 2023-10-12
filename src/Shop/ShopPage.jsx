import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import HeaderShop from './HeaderShop';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

function ShopPage(props) {
  const [originProducts, setOriginProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState('default');

  const [selectedCategory, setSelectedCategory] = useState('all');

  const [pagination, setPagination] = useState({
    page: '1',
    count: '8',
    search: '',
    category: selectedCategory,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          page: pagination.page,
          count: pagination.count,
          search: pagination.search,
          category: pagination.category,
        };

        const query = queryString.stringify(params);
        const newQuery = '?' + query;

        const response = await fetch(
          `https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json${newQuery}&alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74`
        );

        const data = await response.json();
        // Catch error
        if (!response.ok) throw new Error(data.error.message);

        setOriginProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handlerChangeSort = value => {
    setSort(value);
  };

  const handlerChangePage = value => {
    setPagination({
      page: value,
      count: pagination.count,
      search: pagination.search,
      category: selectedCategory,
    });
  };

  const handlerSearch = value => {
    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: value,
      category: selectedCategory,
    });
  };

  const handlerCategory = value => {
    setSelectedCategory(value);
    setPagination(prevPagination => ({
      ...prevPagination,
      category: value,
      page: '1',
    }));

    if (value === 'all') {
      // Nếu chọn "All", lấy danh sách sản phẩm ban đầu
      setFilteredProducts(originProducts);
    } else {
      // Nếu chọn danh mục khác, lọc các sản phẩm tương ứng
      const filteredProducts = originProducts.filter(
        product => product.category === value
      );
      setFilteredProducts(filteredProducts);
    }
  };

  return (
    <Container>
      <HeaderShop />
      <section className="py-5">
        <Row>
          <Sidebar handlerCategory={handlerCategory} />
          <MainContent
            products={filteredProducts}
            sort={sort}
            pagination={pagination}
            totalPage={1}
            handlerSearch={handlerSearch}
            handlerChangeSort={handlerChangeSort}
            handlerChangePage={handlerChangePage}
          />
        </Row>
      </section>
    </Container>
  );
}

export default ShopPage;
