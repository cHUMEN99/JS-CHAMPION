import React from 'react';
import { Route, Routes}  from 'react-router-dom'
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Buy from './components/Buy';
import Try from './components/Try';
//import Card from './components/Card';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import AppContext from './components/context';




function App() {
    const [cartopend, setCartOpened] = React.useState(false);
    const [favoritopend,setFavoritOpend]=React.useState(false);
    const[cartitems,setCartItems]=React.useState([]);
    //const[favorites,setFavorites]=React.useState([]);
    const[searchValue,setSearchValue]=React.useState('');
    const[isLoading,setIsLoading]=React.useState([true]);
    const [items,setItems]=React.useState([]);
    React.useEffect(()=>{
        async function fetchData(){
        
        const itemsResponse= await axios.get('https://661fd6f516358961cd95ad6e.mockapi.io/items');
        const cartResponse=await axios.get('https://661fd6f516358961cd95ad6e.mockapi.io/cart');

        setIsLoading(false);

            setCartItems(cartResponse.data);
            setItems(itemsResponse.data);
        }
        
        fetchData();
     
        },[]);
    

    const OnAddToCart=(obj)=>{
        if(cartitems.find((item)=>Number(item.id) === Number(obj.id))){
            axios.delete(`https://661fd6f516358961cd95ad6e.mockapi.io/cart/${obj.id}`);
            setCartItems((prev)=>prev.filter((item)=>Number(item.id) !== Number(obj.id)));
        }else{

        axios.post('https://661fd6f516358961cd95ad6e.mockapi.io/cart',obj);
        setCartItems((prev)=>[...prev,obj]);
    }
    };

    

    const onRemoveCart=(id)=>{
        axios.delete(`https://661fd6f516358961cd95ad6e.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));

    }

    const OnChangeSearchInput=(event)=>{
        console.log(event.target.value);
        setSearchValue(event.target.value);

    }

    const IsItemAdded = (id) => {
  return cartitems.some((obj) => Number(obj.id) === Number(id));
};

    

    return (
        <AppContext.Provider value={{cartitems,items,IsItemAdded,setCartOpened,setCartItems,}}>
        <div>
            <Buy/>
            {/* {favoritopend ? <Try OnClosefavorite={()=>setFavoritOpend(false)}/>: null} */}
            <div className="wrapper">
                {cartopend && <Drawer items={cartitems} OnClose={() => setCartOpened(false)} OnRemove={onRemoveCart}/>    }
                <Header OnClickCart={() => setCartOpened(true)}  OnClickfavorite={()=>setFavoritOpend(true)}/>


                <Routes>
                <Route 
                path="/" 
                element={<Home 
                            cartitems={cartitems}
                            items={items} 
                            searchValue={searchValue} 
                            setSearchValue={setSearchValue} 
                            OnChangeSearchInput={OnChangeSearchInput}
                            OnAddToCart={OnAddToCart} 
                            setFavoritOpend={setFavoritOpend}
                            isloading={isLoading}
                            
                        />} 
                        />
                

               

                <Route 
                path="/favorites" 
                element={<Favorites/>} 
                        />
               

               

                <Route 
                path="/cartochka" 
                element={<Try/>} 
                        />
                </Routes>


             
            </div>
        </div>
        </AppContext.Provider>
    );
}

export default App;

