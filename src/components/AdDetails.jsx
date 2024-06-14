import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Try from './Try';

function AdDetails({ excelData, OnAddToCart }) {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (excelData && id) {
            const foundAd = excelData.find(item => String(item.B).trim() === String(id).trim());
            setAd(foundAd);
            setLoading(false);
        }
    }, [excelData, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!ad) {
        return (
            <div className='ogoloshenya'>
                <h1>Оголошення не знайдено</h1>
            </div>
        );
    }

    let imageUrl = [];
    if (ad.G) {
        imageUrl = ad.G.split(/[, ]+/).map(url => url.trim());
    }

    return (
        <div>
            <h1>{ad.C}</h1>
            <Try
                title={ad.C}
                price={ad.D}
                imageUrl={imageUrl}
                OnAddToCart={OnAddToCart}
                id={id}
                added={false}
                description={ad.E} // наприклад, якщо є поле з описом
            />
        </div>
    );
}

export default AdDetails;
