import React, { Component } from 'react';
import axios from 'axios'
import ErrorView from '../Views/ErrorView';

const ProductContext = React.createContext();

class ProductProvider extends Component {


    state = {
        searchString: null,
        productData: [],
        filters: [],
        cartElements: [],
        cartCount: 0,
        totalItemCount: [],
        individualPrices: [],
        brandFilterValue: '',
        colorFilterValue: '',
        minPriceFilterValue: '',
        maxPriceFilterValue: '',
        error: false,
        users: null,
        username: null,
        password: null,
        name: null
    }
    componentDidMount() {
        axios.get("https://xebiascart.herokuapp.com/products")
            .then((response) => {
                this.setState({ productData: response.data })
                // this.state.productData.map(product => console.log(product.discount))
                this.state.productData.forEach((product) => {
                    return (
                        this.setState({ totalItemCount: [...this.state.totalItemCount, { id: product.id, quantity: 0 }] })
                    )
                })

            }).catch(error => {
                this.setState({ error: error.response })
            })
        axios.get("https://xebiascart.herokuapp.com/filters")
            .then((response) => {
                this.setState({ filters: response.data })

            })
            .catch(error => {
                error === undefined ?
                    this.setState({ error: true }) :
                    this.setState({ error: error.response })

            })
        axios.get("https://xebiascart.herokuapp.com/users")
            .then((response) => {
                this.setState({ users: response.data })
            })
    }
    //Login Functions 

    onInputChange = (payload) => {
        this.setState({ ...this.state, ...payload });
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.state.users.forEach((user) =>
            user.username === this.state.username && user.password === this.state.password ?
                console.log(this.props) :
                alert("Enter the correct credentialss")
        )
    }

    setfullName = (name) => {
        console.log("hello")
    }
    //Button Disable



    // Filter Methods

    searchOnchangeHandler = (searchString) => {
        this.setState({ searchString: searchString });
    }



    selectOnChangeHandler = (selectValue) => {
        this.setState(selectValue)
    }

    colorAndBrandFilter = (productData) => {
        productData = productData.filter(product => this.state.brandFilterValue !== '' ? product.title.toLowerCase().includes(this.state.brandFilterValue.toLowerCase()) : true)
            .filter(product => this.state.colorFilterValue !== '' ? product.colour.title.includes(this.state.colorFilterValue) : true)
        return productData
    }


    filterSubmitHandler = () => {
        if (this.state.minPriceFilterValue === '' && this.state.maxPriceFilterValue === '') {
            axios.get("https://xebiascart.herokuapp.com/products")
                .then((response) => {
                    this.setState({ productData: response.data })
                    let productData = [...this.state.productData];
                    productData = this.colorAndBrandFilter(productData)
                    this.setState({ productData: productData })

                })
                .catch(error => {
                    this.setState({ error: error.response })

                })

        } else if (this.state.minPriceFilterValue !== '' && this.state.maxPriceFilterValue === '') {
            axios.get("https://xebiascart.herokuapp.com/products")
                .then((response) => {
                    this.setState({ productData: response.data })
                    let productData = [...this.state.productData];
                    productData = this.colorAndBrandFilter(productData).filter(product => product.price.final_price >= parseInt(this.state.minPriceFilterValue.replace('₹', '')))
                    this.setState({ productData: productData })
                })
                .catch(error => {
                    this.setState({ error: error.response })

                })

        } else if (this.state.minPriceFilterValue === '' && this.state.maxPriceFilterValue !== '') {
            axios.get("https://xebiascart.herokuapp.com/products")
                .then((response) => {
                    this.setState({ productData: response.data })
                    let productData = [...this.state.productData];
                    productData = this.colorAndBrandFilter(productData).filter(product => product.price.final_price <= parseInt(this.state.maxPriceFilterValue.replace('₹', '')))
                    this.setState({ productData: productData })
                })
                .catch(error => {
                    this.setState({ error: error.response })

                })

        }
        else if (this.state.minPriceFilterValue !== '' && this.state.maxPriceFilterValue !== '' && this.state.maxPriceFilterValue !== '₹4000+') {
            axios.get("https://xebiascart.herokuapp.com/products")
                .then((response) => {
                    this.setState({ productData: response.data })
                    let productData = [...this.state.productData];
                    productData = this.colorAndBrandFilter(productData).filter(
                        product =>
                            product.price.final_price <= parseInt(this.state.maxPriceFilterValue.replace('₹', ''))
                            &&
                            product.price.final_price >= parseInt(this.state.minPriceFilterValue.replace('₹', ''))
                    )
                    this.setState({ productData: productData })
                })
                .catch(error => {
                    this.setState({ error: error.response })

                })
        } else {
            axios.get("https://xebiascart.herokuapp.com/products")
                .then((response) => {
                    this.setState({ productData: response.data })
                    let productData = [...this.state.productData];
                    productData = this.colorAndBrandFilter(productData)
                    this.setState({ productData: productData })
                })
                .catch(error => {
                    this.setState({ error: error.response })

                })

        }

    }

    removeFilter = () => {
        axios.get("https://xebiascart.herokuapp.com/products")
            .then((response) => {
                console.log("hello from remove")
                this.setState({ productData: response.data })
            })
            .catch(error => {
                this.setState({ error: error.response })

            })
    }
    removeFromCart = (id) => {
        const cartElements = [...this.state.cartElements];
        const index = cartElements.findIndex(item => item === id)
        // cartElements = cartElements.filter(product => product !== id)
        cartElements.splice(index, 1);
        this.setState({ cartElements: cartElements, cartCount: this.state.cartCount - 1 })
    }

    totalItemCountFinder = (id) => {
        const totalItemCount = [...this.state.totalItemCount];
        const index = totalItemCount.findIndex(item => item.id === id);

        return (totalItemCount[index].quantity)
    }
    individualItemPriceCalculator = (id) => {
        const productData = [...this.state.productData];
        const productDataIndex = productData.findIndex(item => item.id === id);
        const price = productData[productDataIndex].price.final_price;

        const totalItemCount = [...this.state.totalItemCount];
        const totalItemCountIndex = totalItemCount.findIndex(item => item.id === id);
        const count = totalItemCount[totalItemCountIndex].quantity;

        const final_price = price * count;
        // this.setState({ hello: "hello" })

        // this.updateIndividualPrices(final_price)

        return final_price;
    }

    updateIndividualPrices = (price) => {
        this.setState({ individualPrices: [...this.state.individualPrices, price] })
    }

    totalItemCountIncrementHandler = (id) => {

        this.setState(prevState => {
            const totalItemCount = [...prevState.totalItemCount];
            const index = totalItemCount.findIndex(item => item.id === id);

            totalItemCount[index].quantity = totalItemCount[index].quantity + 1 <= 10 ? totalItemCount[index].quantity + 1 : totalItemCount[index].quantity;
            return { totalItemCount }
        })

    }
    totalItemCountDecrementHandler = (id) => {

        this.setState(prevState => {
            const totalItemCount = [...prevState.totalItemCount];
            const index = totalItemCount.findIndex(item => item.id === id);

            totalItemCount[index].quantity = totalItemCount[index].quantity - 1 > 0 ? totalItemCount[index].quantity - 1 : totalItemCount[index].quantity;
            return { totalItemCount }

        })

    }
    handleDetails = () => {
        console.log("hello from detail")
    }

    handleAddtoCard = (id) => {
        let allAddedElements = [...this.state.cartElements];

        if (allAddedElements.indexOf(id) === -1) {
            const array = [...this.state.cartElements, id];
            this.setState({ cartElements: array, cartCount: this.state.cartCount + 1, isButtonDisabled: true })
            this.totalItemCountIncrementHandler(id)
        } else {
            alert("Item already added to cart! Please navigate to cart to update the quantity")
        }
    }

    render() {
        return (
            this.state.error === false ?
                <ProductContext.Provider value={{
                    ...this.state,
                    searchOnchangeHandler: this.searchOnchangeHandler,
                    selectOnChangeHandler: this.selectOnChangeHandler,
                    filterSubmitHandler: this.filterSubmitHandler,
                    handleDetails: this.handleDetails,
                    handleAddtoCard: this.handleAddtoCard,
                    totalItemCountIncrementHandler: this.totalItemCountIncrementHandler,
                    totalItemCountDecrementHandler: this.totalItemCountDecrementHandler,
                    totalItemCountFinder: this.totalItemCountFinder,
                    individualItemPriceCalculator: this.individualItemPriceCalculator,
                    removeFilter: this.removeFilter,
                    removeFromCart: this.removeFromCart,
                    isButtonDisabled: this.isButtonDisabled,
                    onInputChange: this.onInputChange,
                    onSubmitHandler: this.onSubmitHandler,
                    setfullName: this.setfullName
                }}>
                    {this.props.children}
                </ProductContext.Provider> :
                <ErrorView error={this.state.error} />
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
