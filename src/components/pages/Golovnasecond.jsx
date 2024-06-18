import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card';
import * as XLSX from 'xlsx';
import ContentLoader from 'react-content-loader';
import './Golovnasecond.css';


function Golovnasecond({ OnAddToCart, setFavoritOpend }) {
    const [excelData, setExcelData] = useState(null);

    useEffect(() => {
        const fetchExcelData = async () => {
            try {
                const response = await fetch('https://docs.google.com/spreadsheets/d/11IrWYOEe7F6E0vgKE4fa57H3SnhQAeRPGs73jg2RGvw/export?format=xlsx');
                const buffer = await response.arrayBuffer();
                const workbook = XLSX.read(buffer, { type: 'buffer' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                setExcelData(jsonData);
            } catch (error) {
                console.error('Error fetching Excel data:', error);
            }
        };

        fetchExcelData();
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const showCards = () => {
        if (!excelData) {
            return (
                <div>
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
                </div>
            );
        }

        const shuffledData = shuffleArray([...excelData]);
        const randomCards = shuffledData.slice(0, 4);
        
        return randomCards.map((item, index) => (
            <Card
                key={index}
                title={item['Опис']}
                price={item['Ціна']}
                imageUrl={item['Фото товару'].split(',')}
                OnPlus={OnAddToCart}
                OnFavorite={() => console.log("Нажми на карточку")}
                id={item.id}
                
                loading={false}
            />
        ));
    };

    return (
        <div style={{ marginTop: '160px', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', textAlign: 'center' }}>
                <Link to="/">
                    <img style={{ height: '500px', marginTop: '30px' }} src='/img/image.jpg' alt="Main" />
                </Link>
                <h2 style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)'
                }}>
                    Автозапчастини нові та вживані
                </h2>
            </div>
      
            <div className='golovnab' >
                <h1 style={{marginRight:'50px'}}>Категорія товарів:</h1>
                <li>
                    <Link to='/'>
                        <button style={{marginRight:'50px'}}>Мотори</button>
                    </Link> 
                </li>
                <li>
                    <Link to='/'>
                        <button style={{marginRight:'50px'}}>Фари</button>
                    </Link> 
                </li>
                <li>
                    <Link to='/'>
                        <button style={{marginRight:'50px'}}>Б/У Автозапчастини</button>
                    </Link> 
                </li>
                <li>
                    <Link to='/'>
                        <button style={{marginRight:'50px'}}>Нові Автозапчастини</button>
                    </Link> 
                </li>
            </div>
            <h1>Вас може зацікавити</h1>
            <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                {showCards()}
            </div>
        </div>
    );
}

export default Golovnasecond;
