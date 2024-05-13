import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import Card from '../Card';

function Home({ searchValue, setSearchValue, OnChangeSearchInput, OnAddToCart, setFavoritOpend, isloading }) {
    const [excelData, setExcelData] = useState(null);

    useEffect(() => {
        const handleFileChange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                setExcelData(jsonData);
            };
            reader.readAsArrayBuffer(file);
        };

        document.getElementById('fileInput').addEventListener('change', handleFileChange);

        return () => {
            document.getElementById('fileInput').removeEventListener('change', handleFileChange);
        };
    }, []);

    return (
        <div className="content">
            <div className="searchf" style={{ marginBottom: '50px' }}>
                <h1>{searchValue ? `Пошук по запросу: "${searchValue}"` : 'Всі кросовки'}</h1>
                <div className="search">
                    <input type="file" id="fileInput" />
                    <img height={14.25} width={14.25} src="/img/search.png" alt="" />
                    {searchValue && <img onClick={() => setSearchValue('')} className='stertu' height={14} width={14} src="/img/hrestuk.png" alt="" />}
                    <input onChange={OnChangeSearchInput} value={searchValue} placeholder="Пошук " />
                </div>
            </div>
            <div className="motors">
                {excelData && excelData.map((item, index) => (
                    <Card
                        key={index}
                        title={item['Опис']}
                        price={item['Ціна']}
                        imageUrl={item['Фото товару']}
                        OnPlus={() => OnAddToCart(item)}
                        OnFavorite={() => console.log("Нажми на карточку")}
                        OnClickfavorite={() => setFavoritOpend(true)}
                        loading={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;