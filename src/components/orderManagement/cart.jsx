import React, { useEffect, useState } from 'react';
import './styles/cart.css';
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

  const getTotalCartPrice = (cart) => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };
  
  const applyDiscountPrice = (cart) => {
    const totalPrice = getTotalCartPrice(cart);
    let totalDiscount = 0;
    cart.forEach(item => {
      totalDiscount += (item.price * (item.discount / 100) * item.quantity);
    });
    return (totalPrice - totalDiscount);
  };

  const handleInputChange = (e, itemId) => {
    const { value } = e.target;
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      const updatedCartItems = cartItems.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
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
                  <th>Discount</th>
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
                          onChange={(e) => handleInputChange(e, item.id)}
                        />
                      </td>     
                      <td>Ksh {(item.price * item.quantity).toLocaleString()}</td>
                      <td>Ksh {(item.discount/100 * item.price * item.quantity).toLocaleString()}</td>
                      <td>
                        <button className="btn" onClick={() => handleRemoveItem(item.id)}>
                          <i className="bi bi-trash" style={{color: "#fff", paddingRight:"0"}}></i>
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="confirm-price">
              <h2>Cart Totals</h2>
                <table>
                  <tbody>
                  <tr>
                    <td>Price Before DIscount</td>
                    <td>Ksh {getTotalCartPrice(cartItems).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>Ksh {(getTotalCartPrice(cartItems) - applyDiscountPrice(cartItems)).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Amount Due</td>
                    <td>Ksh {applyDiscountPrice(cartItems).toLocaleString()}</td>
                  </tr>
                  </tbody>
                </table>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
        {isPopupShown && 
          <Overlay>
              <CheckoutPopup onClose={() => setIsPopupShown(false)} />
          </Overlay>
        }
    </div>
  );
}

export default Cart;
