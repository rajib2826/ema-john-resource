import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './ReviewItem.css';

const ReviewItem = ({ product, handleRemoveFromCart }) => {
  const { id, img, price, name, quantity } = product;
  return (
    <div className='Review-item'>
      <img src={img} alt="" />
      <div className='Review-details'>
        <p className='product-title'>{name}</p>
        <p>Price: <span className='orange-text'>${price}</span></p>
        <p>Order Quantity: <span className='orange-text'>{price}</span></p>
      </div>
      <button onClick={() => handleRemoveFromCart(id)} className='btn-delete'>
        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default ReviewItem;