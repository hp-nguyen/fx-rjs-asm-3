import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Image from '../Common/img/Image';
import Categories from './Categories';
import FeatureSection from './FeatureSection';
import HeroComponent from './HeroComponent';
import Popup from './Popup';
import ProductList from './ProductList';
import SubscribeSection from './SubscribeSection';

function HomePage(props) {
  const [products, setProducts] = useState([]);
  const popupState = useSelector(state => state.Popup);
  // Fetch Product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Lấy 8 product đầu tiên
        const slicedData = data.slice(0, 8);
        setProducts(slicedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-holder">
      <header className="header bg-white">
        <Container>
          <HeroComponent Image={Image} />
          <Categories Image={Image} />

          <ProductList products={products} />

          <FeatureSection />
          <SubscribeSection />
        </Container>
        {popupState.isShow && <Popup />}
      </header>
    </div>
  );
}

export default HomePage;
