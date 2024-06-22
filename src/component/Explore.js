import React, { useState, useEffect, useReducer } from 'react';
import '../style/explore.css';

// Importing the React component required
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';

// Importing the context function and the Link component to route the button to the component requried
import { useProductsContext } from './data/Context';
import { Link } from 'react-router-dom';

function Explore() {

    const { products, setCurrentProduct, categories } = useProductsContext();
    const [category, setCategory] = useState("all");
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        forceUpdate();
    }, [category]);

    // Handler function used to update the current product selected by the user from the explore page
    const selectedProduct = (product) => {
        products.forEach(element => {
            if(element['id'] == product.target.id) {
                setCurrentProduct(element);
            }
        });
    };

    // Handler function used to select the category that user hase choosen 
    const selectedCategory = (e) => {
        let catValue = document.getElementById('cat');
        setCategory(catValue.value);
    };

  return (
    <div class = "explore">
        <div className = "categories">
            <div>
                <select id = "cat" onChange = {selectedCategory}>
                    <option value = "all">All category</option>
                    {
                        categories.map((item, index) => {
                            return (
                                <option id = {item} value = {item}>
                                    {item}
                                </option>
                            );
                        })
                    }
                </select>
            </div>
        </div>
        <div class = "cards">
        {
            
            products.filter((item) => (item['category'] == category || category == "all")).map((prod, index) => {
                return(
                    <div class = "card">
                        <div class = "card__image">
                            <img src = {prod['image']}></img>
                        </div>
                        <div class = "card__info">{prod['title']}</div>
                        <div class = "card__details">
                            <div class=  "price">${prod['price']}</div>
                            <Box sx = {{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center'
                            }}>
                                <Box
                                sx={{
                                    width: 200,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                >
                                
                                
                                <Box sx = {{
                                    flex: 1,
                                }}>
                                <Rating
                                    name="hover-feedback"
                                    value={prod.rating['rate']}
                                    precision={0.5}                              
                                    readOnly
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
                                </Box>
                                
                                <Box sx={{ fontSize: 15, fontWeight: 500, color: "grey"}}>{prod.rating['rate'] + "/5"}</Box>
                                </Box>
                            </Box>
                        </div>
                        <div  class = "card__shop-now">
                            {/* View More */}
                            <Link id = {prod['id']} to = "/product" class = "link" onClick = {selectedProduct}>View more</Link>
                        </div>
                    </div>
                    
                );
            })
        }
        </div>
    </div>
  )
}

export default Explore