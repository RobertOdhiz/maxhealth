import React, { useRef, useEffect } from 'react';
import './styles/carousel.css';
import Delivery from '../../assets/free-delivery.svg';
import Payment from '../../assets/payment.svg'
import Watch from '../../assets/watch.jpg'

function HeroSection() {
  const images = [
    { "src": Delivery, "text": "Free Delivery CountryWide", "title": "Free Delivery", "link": ""},
    { "src": Watch, "text": "Check Out the New Arrivals", "title": "New Arrivals", "link": "" },
    { "src": Payment, "text": "Choose your most efficient mode of payment", "title": "All Payments", "link": "" },
  ];

  const carouselRef = useRef(null);

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const isLastSlide = carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >= carouselRef.current.scrollWidth;
      if (isLastSlide) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' }); // Loop back to the first slide
      } else {
        carouselRef.current.scrollBy({
          left: carouselRef.current.offsetWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="carousel-container">
      <div ref={carouselRef} className="carousel-content">
        {images.map((item, index) => (
          <div key={index} className="carousel-item">
            <img src={item.src} alt={`Image ${index + 1}`} />
            <div className="txt">
              <h1>{item.title}</h1>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-previous" onClick={handlePrevious}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
      </button>
      <button className="carousel-next" onClick={handleNext}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
        </svg>
      </button>
    </div>
  );
}

export default HeroSection;
