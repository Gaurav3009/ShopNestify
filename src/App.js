import React from 'react';
import './App.css';

// Importing all the components
import Body from './component/Body';
import Explore from './component/Explore';
import Header from './component/Header';
import Product from './component/Product';
import Cart from './component/Cart';

// Importing the provider function and the components required from the react-router-dom 
import { ProductsContextProvider } from './component/data/Context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (

    <BrowserRouter>
    <ProductsContextProvider>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Body/>}/>
          <Route exact path = "/explore" element = {<Explore/>}/>
          <Route exact path = "/product" element = {<Product/>}/>
          <Route exact path = "/cart" element = {<Cart/>}/>
      </Routes>    
    </ProductsContextProvider> 
    </BrowserRouter>
  );
}

export default App;
