import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../components/button';
import { Card, CardContent } from '../components/card';
import { useHistory } from "react-router-dom"; 
import { addToCart, removeFromCart, clearCart, decrementFromCart } from '../store/cart';

const Checkout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useHistory();

  const handleOrderClick = () => {
    setShowPopup(true);
    dispatch(clearCart());
  };

  const handleNavigateToProducts = () => {
    setShowPopup(false);
    navigate.push('/products');
  };

  return (
    <div className="p-6 relative min-h-screen bg-gray-50">
    <button
    onClick={() => navigate.push('/login')} 
    className="absolute top-4 left-4 flex items-center gap-1 cursor-pointer"
  >
    🔓 Logout
  </button>
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
        
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

      {/* If Cart is empty */}
      {cartItems.length === 0 ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-600">Your Cart is Empty</h2>
          <p className="mt-4 text-gray-500">It seems like you haven't added anything to your cart yet.</p>
          <p className="mt-4 text-lg font-medium text-blue-600">
            <button
              onClick={handleNavigateToProducts}
              className="hover:underline"
            >
              Browse Products
            </button>
          </p>
        </div>
      ) : (
        <div className="grid gap-4 w-full max-w-3xl">
          {/* Cart items list */}
          {cartItems.map((item, index) => (
            <Card key={index} className="shadow-lg rounded-lg bg-white">
              <CardContent className="flex justify-between items-center p-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(decrementFromCart(item.id))}
                      className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      –
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                    <Button
                    variant="outline"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="px-2 py-1 bg-white-500 top-4 right-4 flex items-center gap-1 text-white text-sm rounded hover:bg-white-600"
                  >
                    🗑️ 
                  </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium text-gray-800">${ (item.price * item.quantity).toFixed(2) }</p>
                 
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Place Order Button */}
      {cartItems.length > 0 && (
        <div className="mt-8 w-full max-w-sm">
          <Button onClick={handleOrderClick} className="w-full">Place Order</Button>
        </div>
      )}

      {/* Order Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-green-600">Order Confirmed!</h2>
            <p className="mb-4 text-gray-600">Thank you for your purchase. Your order has been placed successfully.</p>
            <Button onClick={handleNavigateToProducts} className="w-full">Back to Products</Button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Checkout;
