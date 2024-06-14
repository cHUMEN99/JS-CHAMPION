import React from 'react';
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import './try.css';
import Card from './Card';

function Try({ OnAddToCart, title, price, id, added = false, ...props }) {
  const [isAddedToCart, setIsAddedToCart] = React.useState(added);

  const imageUrl = props.imageUrl && props.imageUrl.length > 0 ? props.imageUrl : ["/img/default-image.svg"];

  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const OnClickPlus = () => {
    if (!isAddedToCart) {
      OnAddToCart({ id, title, imageUrl, price });
      setIsAddedToCart(true);
    }
  };

  return (
    <div className="try">
      <ul className="headerRight1">
        <li>
          <Link to="/">
            <img 
              height={25} 
              width={25} 
              style={{ cursor: 'pointer' }} 
              src="/img/arrowleft.png" 
              alt="Arrow Left" 
            />
          </Link>
          <div className="carousel-container" style={{ marginTop: '60px', marginRight: '70px' }}>
            <Carousel
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              infiniteLoop={true}
              useKeyboardArrows={true}
              autoPlay={false}
            >
              {imageUrl.map((url, index) => (
                <div 
                  key={index} 
                  className="carousel-image" 
                  onClick={() => { setLightboxOpen(true); setCurrentImageIndex(index); }}
                >
                  <img src={url} alt={`Motors ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </li>
        <li className="details">
          <h1>{title}</h1>
          <h4>Продавець: Магазин Champion</h4>
          <div className="try2">
            <ul className="table">
              <li className="price-section table-row">
                <h1 className="table-cell" style={{ color: 'red', marginRight: '10px' }}>{price}₴</h1>
              </li>
              <li className="availability-row">
                <p className="availability">є в наявності!</p>
              </li>
              <p className="table-row">В наявності: {props.description}</p>
              <li className="lishka table-row">
                <button 
                  onClick={OnClickPlus} 
                  disabled={isAddedToCart}
                  className={isAddedToCart ? "added-to-cart" : ""}
                >
                  {isAddedToCart ? "У корзині" : "Купити"}
                </button>
              </li>
              <li className="oplata">
                <h5>Оплата готівкою, карткою, на розрахунковий рахунок або онлайн за допомогою Visa/Mastercard/MonoPay.</h5>
                <img src='/img/visa.svg' alt="Visa" />
                <img src='/img/monopay.svg' alt="MonoPay" />
                <img src='/img/mastercard.svg' alt="MasterCard" />
              </li>
            </ul>
          </div>
        </li>
        <li className="advantages">
          <h3>Наші переваги:</h3>
          <ul className="advantages-list">
            <li className="advantage-item">
              <img 
                className="advantage-image"
                src='/img/dostavka.png' 
                alt="Зручна доставка" 
              /> 
              <span>Зручна доставка</span>
            </li>
            <li className="advantage-item">
              <img 
                className="advantage-image"
                src='/img/garan.png' 
                alt="Гарантія на усі товари" 
              />
              <span>Гарантія на усі товари</span>
            </li>
          </ul>
          <ul className="advantages-list" style={{marginTop:'40px'}}>
            <li className="advantage-item">
              <img 
                className="advantage-image"
                src='/img/garan.png' 
                alt="Консультація на усі товари" 
              />
              <span>Консультація на усі товари</span>
            </li>
            <li className="advantage-item">
              <img 
                className="advantage-image"
                src='/img/garan.png' 
                alt="Миттєва відповідь" 
              />
              <span>Миттєва відповідь</span>
            </li>
          </ul>
          <div className='delivery'>
            <h3>Варіанти доставки:</h3>
            <ul>
              <li className="delivery-item">
                <img src='/img/post-office.svg' className="delivery-icon" alt="Самовивіз" />
                <div>
                  <span>Самовивіз:</span>
                  <h5>З офісу продаж <br />
                      вул. Кульпарківська, 110, <br />
                      Львів, Львівська область, 79000
                  </h5>
                  </div>
              </li>
              <li className="delivery-variantu">
                <img src='/img/nova-poshta.svg' className="delivery-icon" alt="Нова Пошта" />
                <div>
                  <span>У відділення Нової пошти</span>
                  <h5>Безкоштовна доставка від 2500 грн</h5>
                </div>
              </li>
              <li className="delivery-variantu">
                <img src='/img/nova-poshta.svg' className="delivery-icon" alt="Нова Пошта" />
                <div>
                 
                <span>У поштомат Нової пошти</span>
                  <h5>Безкоштовна доставка від 2500 грн</h5>
                </div>
              </li>
              <li className="delivery-variantu">
                <img src='/img/ukr-poshta.svg' className="delivery-icon" alt="Укрпошта" />
                <div>
                  <span>У відділення Укрпошти</span>
                  <h5>Безкоштовна доставка від 2500 грн</h5>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      
      <div className="related-products">
        <h3>Вас також може зацікавити:</h3>
        {/* Передаємо функцію OnAddToCart з компонента Try */}
        <Card 
          imageUrl={imageUrl}
          OnPlus={OnAddToCart}
        />
        <Card 
          imageUrl={imageUrl}
          OnPlus={OnAddToCart}
        />
        <Card 
          imageUrl={imageUrl}
          OnPlus={OnAddToCart}
        />
        <Card 
          imageUrl={imageUrl}
          OnPlus={OnAddToCart}
        />
      </div>
      {/* Відображення лайтбоксу */}
      {lightboxOpen && (
        <Lightbox
          images={imageUrl.map(url => ({ url: url }))}
          onClose={() => setLightboxOpen(false)}
          index={currentImageIndex}
        />
      )}
    </div>
  );
}

export default Try;
