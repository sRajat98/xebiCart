import React, { Component } from 'react';
import NavBarView from '../Views/NavBarView';
import { ProductConsumer } from '../Data/Context';
import CartList from '../Views/CartList';
import EmpytCart from '../Views/EmpytCart';

export default class Cart extends Component {
    render() {
        return (
            <ProductConsumer>
                {value => {

                    return (
                        <React.Fragment>
                            <NavBarView props={this.props} />
                            {
                                value.cartElements ?

                                    value.productData.filter(product => value.cartElements.includes(product.id))
                                        .map(item => {
                                            return (
                                                <CartList product={item} key={item.id} />
                                            )
                                        })
                                    : <p>Hello</p>
                            }
                        </React.Fragment>
                    )
                }}

            </ProductConsumer>

        )
    }
}
