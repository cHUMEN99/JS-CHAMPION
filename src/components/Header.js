import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from './context';

function Header(props) {
  const { cartitems } = React.useContext(AppContext);

  const TotalPrice = cartitems.reduce((sum, obj) => Number(obj.price) + sum, 0);

  return (
    <header className="header">
      <Link to="/">
        <div className="headerLeft">
          <img width={40} height={40} src="/img/logo.jpg" alt="" />
          <div className="headerInfo">
            <h1>Champion</h1>
            <p>Магазин автозапчастин</p>
          </div>
        </div>
      </Link>
      <div className="headermid">
        <li>
          <Link to="/tovar">
            <button>Товари</button>
          </Link>
        </li>
        <li>
          <Link to="/partners">
            <button>Партнери</button>
          </Link>
        </li>
        <button>Про нас</button>
        <button>Контакти</button>
      </div>
      <ul className="headerRight">
        <li onClick={props.OnClickCart} style={{ cursor: 'pointer' }}>
          <img className="white-heart" height={18} width={18} src="/img/cart.svg.png" alt="" />
          <span className="white-heart">{TotalPrice}₴</span>
        </li>
        <li>
          <Link to="/favorites">
            <img className="white-heart" height={18} width={18} src="/img/heart.png" alt="" />
          </Link>
          <img
            style={{ cursor: 'pointer' }}
            onClick={props.OnClickfavorite}
            height={18}
            width={18}
            src="/img/cart.png"
            alt=""
          />
        </li>
      </ul>
    </header>
  );
}

export default Header;
