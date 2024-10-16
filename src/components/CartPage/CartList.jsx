import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { setCartItems } from "../../redux/cartSlice";
import axios from "axios";
import emptyCart from "../../assets/empty-cart.png";

const CartList = () => {
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products")
            .then((response) => {
                dispatch(setCartItems(response.data));
            })
            .catch((error) => {
                console.error("Error fetching cart items:", error);
            });
    }, [dispatch]);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Product Detail</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => <CartItem key={item.id} item={item} />)
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div style={{ width: "100%", height: "100%" }}>
                                    <img
                                        src={emptyCart}
                                        className="img-fluid"
                                        style={{
                                            width: "60%",
                                            height: "auto",
                                            maxHeight: "100%",
                                        }}
                                        alt="Your cart is empty."
                                    />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CartList;
