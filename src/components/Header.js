import React from 'react';
import { Link }  from 'react-router-dom'
import AppContext from './context';

function Header(props){
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
      <ul className="headerRight">
        <li onClick={props.OnClickCart} style={{ cursor: 'pointer' }}>
          <img height={18} width={18} src="/img/cart.svg.png" alt="" />
          <span>{TotalPrice}$</span>
        </li>
        <li>
          <Link to="/favorites">
            <img height={18} width={18} src="/img/heart.png" alt="" />
          </Link>
          <img style={{ cursor: 'pointer' }} onClick={props.OnClickfavorite} height={18} width={18} src="/img/cart.png" alt="" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
