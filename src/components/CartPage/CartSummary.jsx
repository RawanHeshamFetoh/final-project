import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateShippingCost, updateTotalCartPrice } from '../../redux/cartSlice';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
    const { totalCartPrice, shippingCost, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleShippingChange = (e) => {
        dispatch(updateShippingCost(Number(e.target.value)));
    };

    const navigate = useNavigate();
    const navigateToCheckout = () => {
        if(totalCartPrice > 0){
            navigate("/checkout");
        }
    };


    const GetAllCart = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/cart", {
                withCredentials: true,
            });
            const totalCartPrice = response.data.data.totalCartPrice;
            dispatch(updateTotalCartPrice(totalCartPrice)); // Update the Redux store
            console.log("Cart items from totalCartPrice:", totalCartPrice);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    useEffect(() => {
        GetAllCart(); // Fetch cart items on component mount
    }, []);

    return (
        <div className="border p-3">
            <h4>Cart Total</h4>
            <p>Subtotal: <strong>$ {totalCartPrice}</strong></p>


            <button
                onClick={navigateToCheckout}
                className="btn text-white mt-5" style={{
                    backgroundColor: "#EF9E86",
                    borderRadius: "5px",
                }}>Proceed to Checkout</button>
        </div>

    );
};

export default CartSummary;
