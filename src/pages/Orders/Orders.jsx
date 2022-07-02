import axios from "axios";
import React from "react"
import { useContext } from "react";
import { useEffect, useState } from "react";
import Card from "../../components/Card"
import AppContext from "../../context";

function Orders() {
    const { onAddToCart, onAddToFavorite } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
       (async () => {
        try {
            const { data } = await axios.get('https://629e4f29c6ef9335c0b2ba29.mockapi.io/orders');
            // console.log(data.map((obj) => obj.items).flat());
            console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false);
        } catch(err) {
            alert('Ошибка при запросе списка заказов');
            console.error(err);
        }
       })() 
    }, []);

    return (
        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>Мои заказы</h1>
            </div>
            <div className="d-flex flex-wrap">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                <Card 
                    key={index}
                    loading={isLoading}
                    {...item}
                />
                ))
                }
            </div>
        </div> 
    )
}

export default Orders;