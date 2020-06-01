import React from 'react';
import { ProductConsumer } from '../Data/Context'

export default function FilterView(payload) {
    const { selectMapper, ColorSelectMapper, maxPriceSelectMapper, minpriceSelectMapper, discountSelectMapper } = payload

    return (
        <ProductConsumer>
            {
                value => {
                    return (
                        <div className="bottom-container-left">
                            <div className="price-filter-wrapper">
                                <select className="brand-select" onChange={(e) => value.selectOnChangeHandler({ brandFilterValue: e.target.value })}>
                                    <option value=''> --Select Brand--</option>
                                    {selectMapper(value.filters)}
                                </select>
                                <select className="color-select" onChange={(e) => value.selectOnChangeHandler({ colorFilterValue: e.target.value })} >
                                    <option value=''> --Select Colour--</option>
                                    {ColorSelectMapper(value.filters)}
                                </select>
                                <select onChange={(e) => value.selectOnChangeHandler({ minPriceFilterValue: e.target.value })}>
                                    <option value=''> --Select Min Price--</option>
                                    {minpriceSelectMapper(value.filters)}
                                </select>
                                <select onChange={(e) => value.selectOnChangeHandler({ maxPriceFilterValue: e.target.value })}>
                                    <option value=''> --Select Max Price--</option>
                                    {maxPriceSelectMapper(value.filters)}
                                </select>
                                <div className="filter-submit-button-wrapper">
                                    <button className="filter-submit-button" onClick={value.filterSubmitHandler} >Filter</button>
                                    <button className="filter-submit-button remove" onClick={value.removeFilter}>Remove Filters</button>
                                </div>
                            </div>
                        </div>

                    )
                }
            }
        </ProductConsumer>
    )
}
