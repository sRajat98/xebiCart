import React, { Component } from 'react';
import NavBarView from '../Views/NavBarView';
import { ProductConsumer } from '../Data/Context';
import ProductView from '../Views/ProductView';
import FilterView from '../Views/FilterView';




export default class ProductListingPage extends Component {
    selectMapper = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'BRAND' ?
                        filter.values.map((value) => <option key={value.value}>{value.value}</option>) : null
                )
            })
        )
    }
    ColorSelectMapper = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'COLOUR' ?

                        filter.values.map((value) => <option key={value.color}>{value.title}</option>) : null
                )
            })
        )
    }
    maxPriceSelectMapper = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'PRICE' ?

                        filter.values.map((value) => {
                            return (
                                value.key > 2000 || value.key === "Max" ?
                                    <option key={value.key}>{value.displayValue}</option>
                                    : null)
                        }) : null
                )
            })
        )
    }
    minpriceSelectMapper = (filters) => {
        return (
            filters.map((filter) => {
                return (
                    filter.type === 'PRICE' ?
                        filter.values.map((value) => {
                            return (
                                value.key < 2000 || value.key === "Min" ?
                                    <option key={value.key}>{value.displayValue}</option> : null)
                        }) : null
                )
            })
        )
    }
    discountSelectMapper = (productData) => {
        productData.map(product => <option key={product.id}>{product.discount}</option>)
    }
    render() {
        return (
            <ProductConsumer>
                {
                    value => {
                        return (
                            <React.Fragment>
                                <NavBarView searchOnchangeHandler={value.searchOnchangeHandler} props={this.props} />
                                <div className="bottom-container">
                                    <FilterView
                                        selectMapper={this.selectMapper}
                                        ColorSelectMapper={this.ColorSelectMapper}
                                        maxPriceSelectMapper={this.maxPriceSelectMapper}
                                        minpriceSelectMapper={this.minpriceSelectMapper}
                                        discountSelectMapper={this.discountSelectMapper}
                                    />
                                    <div className="bottom-container-right">
                                        <ProductConsumer>
                                            {value => {
                                                return (
                                                    value.searchString ?
                                                        value.productData.filter((product) => product.brand.includes(value.searchString.toLowerCase()))
                                                            .map(product => { return <ProductView key={product.id} product={product} /> }) :
                                                        value.productData.map(product => { return <ProductView key={product.id} product={product} /> })

                                                )
                                            }}
                                        </ProductConsumer>



                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }
                }

            </ProductConsumer>
        )
    }
}



