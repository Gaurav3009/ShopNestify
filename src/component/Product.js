import React, { useEffect } from 'react';
import '../style/product.css';

// Importing the material ui component and the icon required in this component
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';

// Importing the context function and the Link tag to rount the button to the coressponding component
import { useProductsContext } from './data/Context';
import { Link } from 'react-router-dom';

function Product() {
  
    const { currentProduct, quantity, setQuantity, cart, setCart } = useProductsContext();

    // Handler function used to update the quantity when a user updates the quantity in the input tag
    const handleQuantity = () => {
        setQuantity(document.getElementById('quantity').value);
    };

    // It will be useful to deactivate the add to cart button until a quantity more than 0 is selected
    useEffect(() => {
        if(quantity > 0 ) {
            document.getElementById('cart-btn').classList.remove('product__buy-cart-deactive');
            document.getElementById('cart-btn').classList.add('product__buy-cart-active');
        } else {
            document.getElementById('cart-btn').classList.remove('product__buy-cart-active');
            document.getElementById('cart-btn').classList.add('product__buy-cart-deactive');
        }
    }, [quantity]);

    // Handler function to update the cart array with the new product selected 
    const handleCartButton = () => {
        let flag = 0;
        for(let i = 0; i < cart.length; i++) {
            if(cart[i]['product']['id'] == currentProduct['id']) {
                cart[i]['quantity'] = cart[i]['quantity'] + quantity;
                flag = 1;
                break;
            }
        }
        if(flag != 1) {
            cart.push({
                'product' : currentProduct,
                'quantity' : quantity
            });
        }
        setCart(cart);
        setQuantity(0);
    };

    return (
    <div class = "product">
        <div class = "product__image">
            <img src = {currentProduct['image']} alt = "current product"></img>
        </div>
        <div class = "product__details">
            <div class = "title">{currentProduct['title']}</div>
            <div class = "description">{currentProduct['description']}</div>
            <div class = "card__details product__price">
                <div class=  "price">${currentProduct['price']}</div>
                <Box sx = {{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        width: 200,
                        display: 'flex',
                        alignItems: 'center'
                    }}>       
                        <Box sx = {{
                            flex: 1}}>
                            <Rating
                                name="hover-feedback"
                                value={currentProduct.rating['rate']}
                                precision={0.5}                              
                                readOnly
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                        </Box>
                        <Box sx={{ fontSize: 15, fontWeight: 500, color: "grey"}}>{currentProduct.rating['rate'] + "/5"}</Box></Box>
                </Box>
            </div>
            <div className = "product__buy">
                <div className = "product__buy-quantity">
                    <div><label for = "quantity">Quantity</label></div>
                    <div><input type = "number" id = "quantity" min = "1" placeholder = "0" onChange = {handleQuantity}/></div>
                    
                </div>
                
                <div id = "cart-btn" className = "product__buy-cart-deactive">
                    {
                        (quantity > 0)?(<Link style = {{color: "green"}} to = "/cart" className = "link" onClick = {handleCartButton}>Add to cart</Link>):"Add to cart"
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product