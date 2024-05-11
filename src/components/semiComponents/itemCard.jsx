// import { addDoc, collection, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
// import { getAuth } from 'firebase/auth';
import './styles/card.css'
import Placeholder from '../../assets/placeholder.jpg'

function ItemCard(props) {
  const [discountedPrice, setDiscountedPrice] = useState("");

  useEffect(() => {
    setDiscountedPrice(props.price - (props.discount/100 * props.price))
  }, [props.price, props.discount])


  return (
    <div className='card'>
      <div className="card-body">
        <div className="body-top">
            <img src={props.image || Placeholder} alt={props.title} />
            <p className="discount">- {props.discount}%</p>
        </div>
        <h3 className="card-title">{props.title}</h3>
        <h5 className="card-description">{props.description}</h5>
        <p className="card-price">Ksh {props.price.toLocaleString()}</p>
        <p className='card-discounted-price'>Ksh {discountedPrice.toLocaleString()}</p>
        <p className="card-quantity">{props.quantity} items remaining</p>
      </div>
      <div className="card-footer">
        <button className="btn" onClick={props.onClick}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
