import React from 'react';
import '../style/home.css';

// Importing the resources required for the component
import homeImage  from '../images/home-image.jpg';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div class = "home">
        <div class = "home__left">
            <div><h1>ShopNestify</h1></div>
            <div><h3>Where Convenience Meets Quality!</h3></div>
            <div><p>Welcome to ShopNestify, your ultimate style sanctuary! Dive into a world where trends effortlessly merge with comfort, curated just for you. Whether you are seeking the latest fashion statements or cozy home essentials, we've got you covered. Explore our handpicked collection and redefine your shopping experience with ShopNestify today!</p></div>
            <div>
                <Link id = "explore" to = "/explore" class = "link">Explore More</Link>
            </div>
        </div>

        <div class = "home__right">
            <img src = {homeImage} alt = "home-image"/>
        </div>
    </div>
  )
}

export default Home