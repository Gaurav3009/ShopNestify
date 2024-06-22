import React, {useState, useContext, useEffect} from 'react';

const ProductsContext = React.createContext();

export function useProductsContext() {
    return useContext(ProductsContext);
}

export function ProductsContextProvider({children}) {
    
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(0);

    const prod = JSON.parse(window.localStorage.getItem('products'));
    const cat = JSON.parse(window.localStorage.getItem('categories'));

    useEffect(() => {
        if(!products && prod == null) {
        fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(apiData => {
            setProducts(apiData);
            window.localStorage.setItem('products', JSON.stringify(apiData));
        })
        .catch(error => {
            console.error(error);
        })
        } else if(!products && prod != null) {
            setProducts(prod);
        } 
    }, []);

    useEffect(() => {
        if(!categories && cat == null) {
        fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(apiData => {
            setCategories(apiData);
            window.localStorage.setItem('categories', JSON.stringify(apiData));
        })
        .catch(error => {
            console.error(error);
        })
        } else if(!categories && cat != null) {
            setCategories(cat);
        }
    }, []);

    const value = {
        products,
        setProducts,
        categories,
        setCategories,
        currentProduct,
        setCurrentProduct,
        cart, 
        setCart,
        quantity,
        setQuantity,
    };

    return <ProductsContext.Provider value={value}>
        {children}
    </ProductsContext.Provider>
}