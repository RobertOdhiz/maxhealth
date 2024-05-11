import React, { useEffect, useState } from 'react';
import './styles/cart.css';
import handleInputChange from '../semiComponents/utils';
import CheckoutPopup from './checkout';
import Overlay from './utils/overlay';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupShown, setIsPopupShown] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    setIsLoading(false);
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    setIsPopupShown(true);
  };

  if (isLoading) {
    return <p className='disclaimer'>Loading...</p>;
  }

  return (
    <div>
        {cartItems.length === 0 ? (
          <div className='disclaimer'>
            <p>Nothing in cart.</p>
            <a href="/" className='btn-t'>Continue shopping</a>
          </div>
        ) : (
          <div className='cart-items'>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className='cart-item'>
                      <td>{item.title}</td>     
                      <td>
                        <input 
                          name='quantity'
                          value={item.quantity}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </td>     
                      <td>Ksh {item.price}</td>     
                      <td>
                        <button className="btn" onClick={() => handleRemoveItem(item.id)}>
                          <i className="bi bi-trash" style={{color: "#fff", paddingRight:"0"}}></i>
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
        {isPopupShown && 
          <Overlay onClose={() => setIsPopupShown(false)}>
            <CheckoutPopup />
          </Overlay>
        }
    </div>
  );
}

export default Cart;
