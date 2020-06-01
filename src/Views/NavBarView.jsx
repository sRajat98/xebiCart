import React from 'react'
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../Data/Context'


const NavBarView = (payload) => {
    const { props } = payload
    const logOutHandler = () => {
        window.localStorage.removeItem('_token');
        props.history.push('/');
    }
    return (
        <ProductConsumer>
            {
                value => {
                    return (
                        <nav className="navbar-wrapper">
                            <div className="navbar-left-side">
                                <div className="logo-wrapper"><img src={logo} alt="nothing here" /></div>
                                <div className="header__search">
                                    <input type="text" className="header__search__input" placeholder="Search for brands..." onChange={(e) => { value.searchOnchangeHandler(e.target.value) }} />
                                </div>
                            </div>

                            <div className="navbar-right-side">

                                <Link to="/cart"> <div className="mycart-logo-wrapper">
                                    <button className="header__cart"><i className="fa fa-cart-plus" ></i></button>  </div> </Link>
                                <div className="cart-count-wrapper">{value.cartCount}</div>
                                <Link to="/home">  <div className="products-link-wrapper">

                                    <button className="header__home"><i className="fa fa-home" ></i></button>  </div> </Link>
                                <button className="logout-button" onClick={logOutHandler}>Logout</button>
                            </div>
                        </nav>
                    )
                }
            }

        </ProductConsumer>
    )
}


export default NavBarView;