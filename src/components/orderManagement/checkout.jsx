import React, { useState } from 'react';
import './styles/checkout.css'

const CheckoutPopup = ({ onClose }) => {
    const [isPickup, setIsPickup] = useState(true);
    const [deliveryPoint, setDeliveryPoint] = useState('');
    const [pickupOffice, setPickupOffice] = useState('');

    const toggleCheckoutType = () => {
        setIsPickup(!isPickup);
    };

    const handleDeliveryPointChange = (e) => {
        setDeliveryPoint(e.target.value);
    };

    const handlePickupOfficeChange = (e) => {
        setPickupOffice(e.target.value);
    };

    const handleConfirmCheckout = () => {
        // Add logic to confirm checkout
    };

    return (
        <div className="checkout-popup">
            <div className="checkout-content">
                <div className="checkout-header">
                    <h2>Checkout</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="navigation">
                    <button className={`checkout-type-btn ${isPickup ? 'active' : ''}`} onClick={toggleCheckoutType}>Pickup</button>
                    <button className={`checkout-type-btn ${!isPickup ? 'active' : ''}`} onClick={toggleCheckoutType}>Delivery</button>
                </div>
                {isPickup ? (
                    <div className="pickup-options">
                        <label htmlFor="pickup-office">Select Pickup Office:</label>
                        <select id="pickup-office" onChange={handlePickupOfficeChange} value={pickupOffice}>
                            <option value="office1">Office 1</option>
                            <option value="office2">Office 2</option>
                            <option value="office3">Office 3</option>
                        </select>
                    </div>
                ) : (
                    <div className="delivery-options">
                        <label htmlFor="delivery-point">Enter Delivery Point:</label>
                        <input type="text" id="delivery-point" onChange={handleDeliveryPointChange} value={deliveryPoint} />
                    </div>
                )}
                <div className="payment-options">
                    <p>All payments are done on delivery.</p>
                </div>
                <div className="confirm-details">
                    {/* Add form fields for user details */}
                </div>
                <button className="confirm-btn" onClick={handleConfirmCheckout}>Confirm Checkout</button>
            </div>
        </div>
    );
};

export default CheckoutPopup;
