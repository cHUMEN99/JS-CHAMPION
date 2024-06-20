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
          <img width={40} height={40} src={`${process.env.PUBLIC_URL}/img/image.jpg`} alt="Logo" />
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
        <li>
          <Link to='/abaut'>
              <button>Про нас</button>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <button>Зареєструватися</button>
          </Link>
        </li>
      </div>
      <ul className="headerRight">
        <li onClick={props.OnClickCart} style={{ cursor: 'pointer' }}>
          <img className="white-heart" height={18} width={18} src={`${process.env.PUBLIC_URL}/img/cart.svg.png`} alt="Cart" />
          <span className="white-heart">{TotalPrice}₴</span>
        </li>
        <li>
          <Link to="/favorites">
            <img className="white-heart" height={18} width={18} src={`${process.env.PUBLIC_URL}/img/heart.png`} alt="Favorites" />
          </Link>

        </li>
      </ul>
    </header>
  );
}

export default Header;
