import React, { useState, useEffect } from 'react';
import './styles/navbar.css';
import Items from '../../data/items';
import { getCartItemsCount } from '../../utils/cartUtils';

function Navbar() {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const [showHelpOptions, setShowHelpOptions] = useState(false);
    const [cartItemsCount, setCartItemsCount] = useState(0); // State for cart items count

    useEffect(() => {
        // Get the initial cart items count when component mounts
        const count = getCartItemsCount();
        setCartItemsCount(count);
    }, []);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearchButtonClick = () => {
        setShowResults(true);
        const results = [];

        Items.forEach(category => {
            category.items.forEach(item => {
                if (
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.description.toLowerCase().includes(query.toLowerCase())
                ) {
                    results.push(item);
                }
            });
        });

        setSearchResults(results);
    };

    const handleCloseButtonClick = () => {
        setShowResults(false);
        setSearchResults([]);
        setQuery('');
    };

    const handleProfileClick = () => {
        setShowProfileOptions(!showProfileOptions);
        setShowHelpOptions(false); // Close help options if open
    };

    const handleHelpClick = () => {
        setShowHelpOptions(!showHelpOptions);
        setShowProfileOptions(false); // Close profile options if open
    };

    const handleCloseProfileOptions = () => {
        setShowProfileOptions(false);
    };

    const handleCloseHelpOptions = () => {
        setShowHelpOptions(false);
    };

    return (
        <nav>
            <div className="logo">
                MaxHealth
            </div>
            <label>
                <input value={query} onChange={handleInputChange} placeholder='Search by Name, Category or Brand'/>
                <button onClick={handleSearchButtonClick} className='btn-t' disabled={!query}>Search</button>
            </label>
            {showResults && (
                <div className="search-results">
                    <button className="close-button" onClick={handleCloseButtonClick}>Close</button>
                    {searchResults.length > 0 ? (
                        searchResults.map((item, key) => (
                            <div key={key}>
                                <p>{item.title}</p>
                            </div>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            )}
            <div className="nav-menu">
                <ul>
                    <li onClick={handleProfileClick}>
                    <i class="bi bi-person-lines-fill"></i>
                    Profile</li>
                    {showProfileOptions && (
                        <div className="profile-options">
                            <button className="close-button" onClick={handleCloseProfileOptions}>Close</button>
                            <ul>
                                <li><a href="/">Option 1</a></li>
                                <li><a href="/">Option 2</a></li>
                                <li><a href="/">Option 3</a></li>
                            </ul>
                        </div>
                    )}
                    <li onClick={handleHelpClick}>
                    <i class="bi bi-patch-question"></i>
                    Help</li>
                    {showHelpOptions && (
                        <div className="help-options">
                            <button className="close-button" onClick={handleCloseHelpOptions}>Close</button>
                            <ul>
                                <li><a href="/">Help Option 1</a></li>
                                <li><a href="/">Help Option 2</a></li>
                                <li><a href="/">Help Option 3</a></li>
                            </ul>
                        </div>
                    )}
                    <li>
                        <a href="/cart">
                        <i class="bi bi-cart"></i>
                        </a>
                            <span className="cart-items-count">{cartItemsCount}</span>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
