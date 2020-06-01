import React from 'react';
// import ShoppingPage from './Components/shoppingpage';
import LoginPage from './Components/LoginPage'
import ProductListingPage from './Components/ProductListingPage'
import Cart from './Components/Cart';
import { Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact={true} path="/" component={LoginPage} />
        <Route exact={true} path="/home" component={ProductListingPage} />
        <Route path="/cart" component={Cart} />
      </BrowserRouter>

    </div>
  );
}

export default App;
