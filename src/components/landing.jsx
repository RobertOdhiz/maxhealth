import React, { useEffect, useState } from 'react';
import Items from '../data/items';
import ItemCard from './semiComponents/itemCard';
import './landing.css';
import Placeholder from '../assets/placeholder.jpg';
import HeroSection from './semiComponents/hero';
import { addToCart, getCartItemsCount } from '../utils/cartUtils';
import Overlay from './orderManagement/utils/overlay';

function Landing() {
  const title = "Maximum Health | Home";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Added state for cart items

  useEffect(() => {
    document.title = title;
    setCartItems(getCartItemsCount()); // Load cart items on component mount
  }, [title]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = existingCart?.findIndex(item => item.id === selectedItem.id);

    if (itemIndex === -1) {
        // New item, add with quantity
      const newItem = { ...selectedItem, quantity };
      localStorage.setItem('cartItems', JSON.stringify([...existingCart, newItem]));
      setCartItems([...existingCart, newItem]);
    } else {
      // Item already exists, update quantity
      const updatedCart = [...existingCart];
      updatedCart[itemIndex].quantity += quantity;
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
    }

    setIsSuccess(true);
    setIsModalOpen(false);

    setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const calculateDiscount = (price, discount) => {
    const discountValue = parseFloat(discount);
    const discountedPrice = price - (price * (discountValue / 100));
    return discountedPrice.toLocaleString();
  };

  return (
    <div className='home'>
      <HeroSection />
      {Items.map(category => (
        <div key={category.id} className='home-container'>
          <h2 className='category-title'>{category.category}</h2>
          <div className="items-container">
            {category.items.map(item => (
              <ItemCard
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                discount={item.discount}
                refundable={item.refundable}
                quantity={item.quantity}
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedItem(item);
                  setQuantity(1);
                }}
              />
            ))}
          </div>
        </div>
      ))}
      {isModalOpen && selectedItem && (
        <Overlay onClose={() => setIsModalOpen(false)}>
          <div className="modal">
            <img src={selectedItem.image || Placeholder} alt={selectedItem.title} className="modal-image" />
            <div className="modal-content">
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.description}</p>
              <p>Price: Ksh {calculateDiscount(selectedItem.price, selectedItem.discount)}</p>
              <p>Discount: {selectedItem.discount}%</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                min={1}
                className="quantity-input"
                placeholder="Quantity"
              />
              <button onClick={handleAddToCart} className="btn">Add to Cart</button>
              <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            </div>
        </div>
        </Overlay>
      )}
      {isSuccess && (
        <div className="success-message">
          {selectedItem.title} added to cart successfully!
        </div>
            )}
        </div>
    );
}

export default Landing;
