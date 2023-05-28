import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Cart.css'

const Cart = ({ cart, handleClearCart, children }) => {
  // const cart = props.cart;  //option-1
  // const { cart } = props; //Destructuring option-2
  // function parameter a o destructuring kora jai 
  console.log(cart);

  let total = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    if (product.quantity === 0) {
      product.quantity = 1;
    }
    total = total + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    quantity = quantity + product.quantity;

  }

  const tax = total * 7 / 100;
  const grandTotal = total + totalShipping + tax;

  return (
    <div className='cart'>
      <h4>Order Summary</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total Price:${total} </p>
      <p>Total Shipping:${totalShipping} </p>
      <p>Tax:${tax.toFixed(2)} </p>
      <h6>Grand Total:${grandTotal.toFixed(2)} </h6>
      <button onClick={handleClearCart} className='btn-clear-cart'>

        <span>Clear Cart</span>
        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
      </button>
      {children}
    </div>
  );
};

export default Cart;