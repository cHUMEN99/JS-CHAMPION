import React from "react";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import AppContext from "./context";

function Card({ OnClickfavorite, OnPlus, title, imageUrl, price, id, added = false, loading = false }) {
  //const [isadd, setIsadd] = React.useState(added);
  const [islike, setIslike] = React.useState(false);
  const {IsItemAdded}=React.useContext(AppContext)
  
  
  

  const OnClickPlus = () => {
    //if (!isadd && !loading) { // Додаємо перевірку на стан завантаження
      OnPlus({ id, title, imageUrl, price });
      //setIsadd(true);
    //}
  };

  const OnClickLike = () => {
    setIslike(!islike);
  };

  return (
    <div className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          
          <rect x="1" y="0" rx="10" ry="10" width="150" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="118" y="230" rx="10" ry="10" width="32" height="32" />
          <circle cx="20" cy="20" r="20" />
        </ContentLoader>
      ) : (
        <>
          <div className="favorite">
            <img
              height={18}
              onClick={OnClickLike}
              src={islike ? "/img/redheart.png" : "/img/heart50.png"}
              alt="unliked"
              style={{ verticalAlign: "top" }}
            />
          </div>
          <Link to="cartochka">
            <img
              onClick={OnClickfavorite}
              height={112}
              width={133}
              src={imageUrl}
              alt=""
              style={{ marginTop: "20px" }}
            />
          </Link>
          <h5>{title}</h5>

          <div className="cardbotom">
            <div className="price">
              <span>Ціна:</span>
              <b>{price}$</b>
            </div>

            <button  onClick={OnClickPlus}> 
              <img
                className="plus"
                height={11}
                width={11}
                src={IsItemAdded(id) ? "/img/done.png" : "/img/plus.png"}
                alt=""
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
