import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetch('products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  useEffect(() => {
    const storeCart = getShoppingCart();
    const savedCart = [];
    //step-1: get id
    for (const id in storeCart) {
      //step-2 get the product by using id
      const addedProduct = products.find(product => product.id === id);

      //step-3: get quantity of the product
      if (addedProduct) {
        const quantity = storeCart[id];
        addedProduct.quantity = quantity;
        //step-4 add the added product to the save cart
        savedCart.push(addedProduct);

        // console.log(addedProduct);
      }
    }

    //step-5 set to the cart
    setCart(savedCart)

  }, [products])

  const handleAddToCart = (product) => {
    // const newCart = [...cart, product];
    let newCart = [];

    const exists = cart.find(pd => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product]

    }
    else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter(pd => pd.id !== product.id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    addToDb(product.id);
  }

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  }



  return (
    <div className='shop-container'>
      <div className="products-container">
        {
          products.map(product => <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>)
        }
      </div>
      <div className="cart-container">
        <Cart
          cart={cart}
          handleClearCart={handleClearCart}
        >
          <Link className='proceed-link' to="/orders">
            <button className='btn-proceed'>Review Order
              <FontAwesomeIcon className='delete-icon' icon={faArrowRight} />
            </button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;