export const addToCart = (item, quantity, setCartItems) => {
    // Get existing cart items from local storage or initialize an empty array
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Add the new item to the cart with its quantity
    const updatedCartItems = [...existingCartItems, { ...item, quantity }];
    // Update the cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    // Update the cart items state in the component
    setCartItems(updatedCartItems);
};

export const getCartItemsCount = () => {
    // Get existing cart items from local storage
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Calculate and return the total number of items in the cart
    return existingCartItems.reduce((total, item) => total + item.quantity, 0);
};
