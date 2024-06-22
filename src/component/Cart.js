import React, { useReducer } from 'react';
import '../style/cart.css';

// Importing the image resources and the context function 
import cartImage from '../images/cartImage.png';
import { useProductsContext } from './data/Context';

function Cart() {

    const {cart, setCart} = useProductsContext();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    // Handler function to handle the quantity change if the user wants to update the quantity
    const handleQuantity = (e) => {
        let id = parseInt(e.target.id.match(/\d+/)[0]);
        let newQuantity = document.getElementById('quantity' + id).value;
        toggleClass(id);
        let arr = cart;
        if(newQuantity == 0) {
            arr.splice(id, 1);
        } else {
            arr[id]['quantity'] = newQuantity;
        }
        setCart(arr);
        forceUpdate();
    };
    
    // This function is used to hide the save and the input tag used to update quantity and will be triggered when the user hits on save button
    const toggleClass = (id) => {
        document.getElementById('save' + id).classList.toggle('inactive');
        document.getElementById('save' + id).classList.toggle('active');
        document.getElementById('quantity' + id).classList.toggle('inactive');
        document.getElementById('quantity' + id).classList.toggle('active');
    }

    // It is used when the the user hits on the edit button 
    const enableEdit = (e) => {
        toggleClass(e.target.id);
    };

    // Handler function created when the user wants to remove an item from the cart 
    const removeProduct = (e) => {
        let arr = cart;
        arr.splice(e.target.id, 1);
        setCart(arr);
        forceUpdate();
    };

  return (
    <div className = "cartPage">
        <div className = "cart">
        {
            (cart.length == 0)?
                <img src = {cartImage}/>:
            cart.map((items, index) => {
                return (
                    <div className = "cart-product">
                        <div className = "cart-product__image">
                            <img src = {items['product']['image']} alt = "image"/>
                        </div>

                        <div className = "cart-product__details">
                            <div className = "details__title">
                                {items['product']['title']}
                                <span id = 'category'>{items['product']['category']}</span>
                            </div>
                            <div className = "detail__price">
                                <div className = "price">${items['quantity'] * items['product']['price']}</div>
                                <div className = "product__buy-quantity">
                                    <div><label for = {"quantity" + index}>Quantity : {items['quantity']}</label></div>
                                    <div><input className = "inactive" type = "number" id = {"quantity" + index} min = "1" placeholder = "Enter"/></div>
                                    <div id = {"save" + index} className = "btn2 inactive" onClick = {handleQuantity}>Save</div>
                                    <div id = {index} className = "btn1" onClick={enableEdit}>Edit</div>
                                </div>
                                <div className = "action" id = {index} onClick={removeProduct}>Remove</div>
                            </div>
                        </div>
                    </div>
                );
            })
        }
    </div>
    <div className = "buyerDetails">
        <div className = "cart-Details">
            <div className = "cart-Details__heading">Cart Details</div>
            <div className = "cart-Details__count">Total products : <span>{cart.length}</span></div>
            <div className = "cart-Details__products">
                <table border={2}>
                    <tr>
                        <th>Product name</th>
                        <th>Amount</th>
                    </tr>
                    {
                        cart.map((item, index) => {
                            return (
                                <tr>
                                    <td id = "table-product-name">{item['product']['title']}</td>
                                    <td id = "table-product-amount">{item['quantity'] * item['product']['price']}</td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <th>Total Amount</th>
                        <td id = "table-total-sum">{
                            cart.reduce((accumulator, item) => accumulator + (item['quantity'] * item['product']['price']), 0)
                            }</td>
                    </tr>
                </table>
            </div>
        </div>
        <div className = "btn-group">
            <div className='user-btn'>Checkout</div>
        </div>
    </div>
    </div>
  )
}

export default Cart