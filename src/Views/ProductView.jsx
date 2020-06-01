import React from 'react'
import { ProductConsumer } from '../Data/Context'



export default function ProductView(payload) {
    const { id, image, brand, price, discount, colour } = payload.product;
    return (
        <ProductConsumer>
            {
                value => {
                    return (
                        <div className="card" key={id}>
                            <div className="card-container">
                                <img src={image} alt="nothing here" className="card__image" />
                                <div className="card__content">
                                    <div className="product-name-wrapper">{brand}</div>
                                    <div className="color-wrapper" > Color: <span className="color-title-wrapper" style={{ backgroundColor: colour.color }}>#</span> {colour.title} </div>
                                    {price.mrp ? <div className="product-mrp-wrapper"> MRP:<span> {price.mrp} </span> (Discount:{discount}%!!)</div> : null}

                                    <div className="product-price-wrapper">Final Price:{price.final_price}</div>
                                    <div className="card__info">
                                        <div className="add-to-cart-button-wrapper" onClick={() => { value.handleAddtoCard(id); }}><button className="add-to-cart-button"   > Add To Bag</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
            }
        </ProductConsumer>
    )
}




