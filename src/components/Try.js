
import { Link } from "react-router-dom";
import Card from "./Card";



const arr=[
  {title:'Мотор BMW V34 top za svoi groshi M5E60',price:1299,imageUrl:"/img/1.jpg"},
  {title:'Мотор Volskavagen TDI 2.0 top za svoi groshi M5E60',price:1519,imageUrl:"/img/2.jpg"},
  {title:'Мотор Audy TDI 2.0 top za svoi groshi M5E60',price:919,imageUrl:"/img/3.jpg"}
  

  
];

function Try(props) {
  
  return (
    
    <div  className="try">
      
      <ul className="headerRight1">
        <li>
          <Link to="/"><img height={25} width={25} style={{cursor:'pointer'}} onClick={props.OnClosefavorite} src="/img/arrowleft.png" alt=""></img>  </Link>
          <img style={{ marginLeft: '40px',marginTop:'60px',marginRight:'70px' }} height={160} width={160} src="/img/1.jpg" alt="Motors" />
        </li>
        <li>
          <h1>Мотор BMW V6</h1>
          <div className="try2">
            <ul>
              <li style={{ display: 'flex', alignItems: 'center'}}>
                <h1 style={{ color: 'red', marginRight: '10px' }}>Ціна:1299$</h1>
                <img src="/img/plus.png" alt="" />
              </li>
              <p>Опис: Хороший Мотор з BMW E36 Зібраний в німенчині такий то такий то </p>

              <li className="lishka">
                <button style={{ marginRight: '10px' }}>Купити!</button>
                <button >Чат з продавцем</button>
                
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div>
        <h2 style={{ marginTop: '50px', marginLeft: '30px' }}>Інші пропозиції</h2>
        <div className="Prop">
          
          {arr.map((obj)=>
            (
              <Card title={obj.title}price={obj.price} imageUrl={obj.imageUrl}/>
            ))}
        </div>
      </div>
      
    </div>
  );
}

export default Try;
