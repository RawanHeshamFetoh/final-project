import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart, deletePro } from "../../redux/cartSlice";
import styles from "./Cart.module.css";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";


const CartList = () => {
    const [cartItems, setCartItems] = useState([]); // State to store cart items
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const dispatch = useDispatch(); // Initialize dispatch for Redux

    const GetAllCart = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/cart", {
                withCredentials: true,
            });
            console.log("Cart items response:", response.data);

            // Check if the response contains valid cart data
            if (
                response.data &&
                response.data.data &&
                Array.isArray(response.data.data.cartItems)
            ) {
                setCartItems(response.data.data.cartItems); // Set cart items from the response
            } else {
                setCartItems([]); // Treat missing or empty cart data as an empty cart
            }

            setLoading(false); // Stop loading once data is fetched
        } catch (error) {
            console.error("Error fetching cart items:", error);

            // Check if the error is due to a network issue or a server error
            if (error.response && error.response.status === 404) {
                // If the cart endpoint returns 404, it might mean the cart is empty
                setCartItems([]); // Clear cart items to show the empty cart message
            } else {
                // Set error for any other type of failure
                setError("Failed to load cart items.");
            }

            setLoading(false); // Stop loading after error handling
        }
    };

    const queryClient = useQueryClient();
    const DeleteAllCart = async () => {
        try {
            await axios.delete("http://localhost:3000/api/v1/cart", {
                withCredentials: true,
            });
            setCartItems([]); 
            dispatch(clearCart());
            queryClient.invalidateQueries("cart length");

            console.log("All cart items deleted successfully.");
        } catch (error) {
            console.error("Error deleting cart items:", error);
        }
    };

    const DeleteProduct = async (_id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/cart/${_id}`, {
                withCredentials: true,
            });

            dispatch(deletePro(_id)); 
            toast.success("Product deleted successfully.");

            GetAllCart();
            queryClient.invalidateQueries("cart length");

            console.log("Product deleted successfully.");
        } catch (error) {
            console.error("Error deleting Product:", error);
        }
    };

    
    useEffect(() => {
        GetAllCart(); // Fetch cart items on component mount
    }, []);

    if (loading) {
        return <p>Loading cart items...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div className="row mt-3">
                {loading ? (
                    <p>Loading cart items...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : cartItems.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Detail</th>
                                <th>Price</th>
                                <th>Color</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(
                                (item) => (
                                    console.log("item", item),
                                    (
                                        <CartItem
                                            key={item._id}
                                            item={item}
                                            DeleteProduct={DeleteProduct}
                                        />
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        <img
                            src={require("../../assets/empty-cart.png")}
                            alt="Your Cart is Empty"
                            className={styles.fixedSizeImg}
                        />
                    </div>
                )}
            </div>

            <div className="row mt-3">
                <div className="d-flex justify-content-between">
                    <Link to="/">
                        <button
                            className="btn text-white"
                            style={{
                                backgroundColor: "#EF9E86",
                                borderRadius: "5px",
                            }}
                        >
                            Continue Shopping
                        </button>
                    </Link>
                    <button className="btn btn-outline-secondary" onClick={DeleteAllCart}>
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartList;
