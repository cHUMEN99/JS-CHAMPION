import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Buy from './components/Buy';
import Try from './components/Try';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import AppContext from './components/context';
import AdDetails from './components/AdDetails';
import * as XLSX from 'xlsx';
import Footer from './components/Footer';
import Partners from './components/Partners';
import Golovna from './components/pages/Golovna';
import Golovnasecond from './components/pages/Golovnasecond';
import './index.css'

function App() {
    const [cartopend, setCartOpened] = useState(false);
    const [excelData, setExcelData] = useState(null);
    const [favoritopend, setFavoritOpend] = useState(false);
    const [cartitems, setCartItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    console.log(excelData);
    if (excelData && excelData.length > 0) {
        console.log(excelData[0].name);
    } else {
        console.log("Excel data is not yet available or empty.");
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const itemsResponse = await axios.get('https://661fd6f516358961cd95ad6e.mockapi.io/items');
                const cartResponse = await axios.get('https://661fd6f516358961cd95ad6e.mockapi.io/cart');
        
                // Fetch Google Sheets data
                const sheetURL = 'https://docs.google.com/spreadsheets/d/11IrWYOEe7F6E0vgKE4fa57H3SnhQAeRPGs73jg2RGvw/export?format=xlsx';
                

                const response = await axios.get(sheetURL, { responseType: 'arraybuffer' });

                const data = new Uint8Array(response.data);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
        
                setIsLoading(false);
                setCartItems(cartResponse.data);
                setItems(itemsResponse.data);
                setExcelData(jsonData); // Set all Excel data at once
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        
        fetchData();
    }, []);

    const OnAddToCart = (obj) => {
        if(cartitems.find((item) => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://661fd6f516358961cd95ad6e.mockapi.io/cart/${obj.id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        } else {
            axios.post('https://661fd6f516358961cd95ad6e.mockapi.io/cart', obj);
            setCartItems((prev) => [...prev, obj]);
        }
    };

    const onRemoveCart = (id) => {
        axios.delete(`https://661fd6f516358961cd95ad6e.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const OnChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const IsItemAdded = (id) => {
        return cartitems.some((obj) => Number(obj.id) === Number(id));
    };

    return (
        <AppContext.Provider value={{ cartitems, items, IsItemAdded, setCartOpened, setCartItems }}>
            <div>
                <Buy/>
                <div className="wrapper">
                    {cartopend && <Drawer items={cartitems} OnClose={() => setCartOpened(false)} OnRemove={onRemoveCart} />}
                    <Header OnClickCart={() => setCartOpened(true)} OnClickfavorite={() => setFavoritOpend(true)} />

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
                            path="/tovar" 
                            element={<Golovnasecond/>} 
                        />
                         <Route 
                            path="/partners" 
                            element={<Partners/>} 
                        />
                        <Route 
                            path="/cartochka" 
                            element={<Try
                                OnAddToCart={OnAddToCart}/>} 
                        />
                        
                        <Route 
                            path="/ad/:id" 
                            element={<AdDetails excelData={excelData} OnAddToCart={OnAddToCart}/>} // Pass the fetched data to AdDetails
                        />
                    </Routes>
                    <Footer/>
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;