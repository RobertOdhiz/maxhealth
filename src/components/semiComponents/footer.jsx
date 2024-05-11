import React from 'react'
import './styles/footer.css'

function Footer() {
  return (
    <footer>
        <div className='footer-container'>
        <div className="footer-components">
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Products</li>
            </ul>
        </div>
        <div className="footer-components">
            <ul>
                <li>X</li>
                <li>FaceBook</li>
            </ul>
        </div>
        <div className="footer-components">
            <ul>
                <li>email@example.com</li>
                <li>(254) 700 000000</li>
            </ul>
        </div>
        </div>
        <p className='copyright'>&#169; 2024</p>
    </footer>
  )
}

export default Footer;