import React from "react"
import Card from "../../components/Card"

function Wishlist({ items, onAddToFavorite }) {
    return (
        <div className="content p-40">
            <div className='d-flex align-center mb-40 justify-between'>
                <h1>Избранные товары</h1>
            </div>
            <div className="d-flex flex-wrap">
            {items
                .map((item) => (
                    <Card
                    key={item.id}
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