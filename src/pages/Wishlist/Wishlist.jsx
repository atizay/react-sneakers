import React from "react"
import { useContext } from "react";
import Card from "../../components/Card"
import AppContext from "../../context";

function Wishlist({ onAddToFavorite }) {
    const { favorites } = useContext(AppContext);
    return (
        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>Избранные товары</h1>
            </div>
            <div className="d-flex flex-wrap">
            {favorites.map((item, index) => (
                    <Card
                    key={index}
                    favorited={true}
                    onFavorite={onAddToFavorite}
                    // onWishlist={(obj) => onAddToFavorite(obj)}
                    {...item}
                    />
                    ))
                }
            </div>
        </div> 
    )
}

export default Wishlist;