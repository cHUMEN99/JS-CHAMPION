import React from "react";
import Info from "./info";
import AppContext from "./context";

function Drawer({ OnClose, OnRemove, items = [] }) {
  const [isComplete, setIsComplete] = React.useState(false);
  const { setCartItems } = React.useContext(AppContext);
  const { cartitems } = React.useContext(AppContext);

  // Розрахунок загальної суми замовлення
  const totalPrice = cartitems.reduce((sum, obj) => Number(obj.price) + sum, 0);
  // Розрахунок податку
  const tax = totalPrice * 0.05;

  const OnClickOrder = () => {
    setIsComplete(true);
    setCartItems([]);
  };

  return (
    <div className="overley">
      <div className="drawer">
        <h2 style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between' }}>
          Кошик
          <img onClick={OnClose} className="remove1" height={30} width={30} src="/img/hrestuk.png" alt="" />
        </h2>

        {items.length > 0 ? (
          <div className="items">
            {items.map((obj) => (
              <div className="cartitem" style={{ marginBottom: '20px' }} key={obj.id}>
                <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartitemimg"></div>
                <div className="cartname">
                  <p>{obj.title}</p>
                  <b>{obj.price}$</b>
                  <div>
                    <img onClick={() => OnRemove(obj.id)} className="remove" height={30} width={30} src="/img/hrestuk.png" alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Info title={isComplete ? "Заказ оформлено" : "Корзина Пуста"} image={isComplete ? "/img/zamovlenya.png" : "/img/box.png"} />
        )}

        <ul className="totalblock">
          <li className="togo">
            <span>Того:</span>
            <div></div>
            <b>{totalPrice}$</b>
          </li>
          <li className="togo1">
            <span>Налог 5%</span>
            <div></div>
            <b>{tax.toFixed(2)}$</b>
          </li>
          <button onClick={OnClickOrder}>Оплатити<img height={25} width={25} src="/img/arrow1.png" alt="Arrow" /></button>
        </ul>

      </div>
    </div>
  );
}

export default Drawer;
