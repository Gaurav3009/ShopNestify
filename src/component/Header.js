import React from 'react';
import '../style/header.css';

// Importing the rsources required in this component 
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import { Link } from 'react-router-dom';


function Header() {

    // Hnadler function used to open the side drawer created for the mobile view
    const handleDrawer = () => {
        document.getElementById('side-drawer').classList.toggle('inactive');
    };

  return (
    <div class = "navigation">
        <div class = "logo">
            ShopNestify
        </div>

        <div class = "links">
            <div class = "links__btn">
                <div class = "btn"><Link id = "home-btn"className= 'link' to = "/" >Home</Link></div>
                <div class = "btn"><Link id = "explore-btn" class = "link" to = "/explore" >Products</Link></div>
                <div class = "btn"><Link id = "nav-cart-btn" to = "/cart" class = "link" >Cart</Link></div> 
                <div id = "drawer">
                    <DensityMediumRoundedIcon onClick = {handleDrawer}/>
                </div>
            </div>
        </div>

        <div id = "side-drawer" className = "inactive side-drawer">
            <div className = "side-drawer__controls">
            <div><Link id = "home-btn1" className = "link" to = "/" >Home</Link></div>
            <div><Link id = "explore-btn1" className = "link" to = "/explore" >Products</Link></div>
            <div><Link id = "nav-cart-btn1" className = "link" to = "/cart" >Cart</Link></div>
            <div onClick={handleDrawer}>Close</div>
            </div>
        </div>
    </div>
  )
}

export default Header