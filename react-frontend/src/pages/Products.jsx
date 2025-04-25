import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, decrementFromCart } from '../store/cart';
import { useHistory } from 'react-router-dom'; 
import axios from 'axios';
import { Button } from '../components/button';

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useHistory(); // Correct hook for navigation in react-router-dom v6

  const cartItems = useSelector(state => state.cart.items);

  const uniqueCount = cartItems.length;

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      // If the product already exists in the cart, update the quantity
      dispatch(addToCart(product));
    } else {
      // If it's a new product, add it to the cart
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleDecrement = (productId) => {
    const existingProduct = cartItems.find(item => item.id === productId);
    if (existingProduct && existingProduct.quantity > 1) {
      dispatch(decrementFromCart(productId));
    } else {
      dispatch(removeFromCart(productId)); // If quantity is 1, remove the item
    }
  };

  return (
    <div className="p-6 relative min-h-screen bg-gray-50">
      {/* Cart Icon */}
      <button
  onClick={() => navigate.push('/login')} 
  className="absolute top-4 left-4 flex items-center gap-1 cursor-pointer"
>
  🔓 Logout
</button>
      <div
        className="absolute top-4 right-4 flex items-center gap-1 cursor-pointer"
        onClick={() => navigate.push('/checkout')} // Updated to use navigate
      >
        <span className="text-2xl">🛒</span>
        <span className="text-xs font-bold bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
          {uniqueCount}
        </span>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => {
          const productInCart = cartItems.find(item => item.id === product.id);
          return (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>

              {/* Conditional rendering based on cart status */}
              {productInCart ? (
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => handleDecrement(product.id)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    –
                  </button>
                  <span className="text-lg">{productInCart.quantity}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                   <Button
                    variant="outline"
                    onClick={() => handleRemoveProduct(product.id)}
                    className="px-2 py-1 bg-white-500 text-white text-sm rounded hover:bg-white-600"
                  >
                    🗑️ 
                  </Button>
               
                </div>
              ) : (
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
