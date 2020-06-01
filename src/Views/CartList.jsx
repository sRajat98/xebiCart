import React from 'react';
import { ProductConsumer } from '../Data/Context';
import trash from '../images/trash.png';

const CartList = (payload) => {
    const { product } = payload
    return (
        <React.Fragment>
            <ProductConsumer>
                {
                    value => {
                        return (
                            <div className="individual-cartlist-item-wrapper">
                                <div className="cartlist-item-image-wrapper"><img src={product.image} alt="nothing here" /></div>
                                <div className="item-wrapper">
                                    <div className="cartlist-item-title-wrapper">Brand:{product.brand}</div>
                                    <div className="cartlist-item-price-wrapper"> Final Price:  ₹{product.price.final_price} (Qty: 1)</div>
                                    <div className="cartlist-item-quantity-wrapper">
                                        <button onClick={() => value.totalItemCountDecrementHandler(product.id)}>-</button>
                                        <span>{value.totalItemCountFinder(product.id)}</span>
                                        <button onClick={() => value.totalItemCountIncrementHandler(product.id)}>+</button>
                                    </div>
                                    <div className="cartlist-item-total-wrapper">Total Price : {value.individualItemPriceCalculator(product.id)}</div>
                                    <div><button className="remove-button" onClick={() => value.removeFromCart(product.id)}>Remove from Cart</button></div>
                                </div>
                            </div>
                        )
                    }
                }
            </ProductConsumer>
        </React.Fragment>
    )
}

export default CartList;
