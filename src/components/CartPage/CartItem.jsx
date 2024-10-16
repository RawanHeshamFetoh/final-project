import React from "react";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../redux/cartSlice";

const CartItem = ({ item,DeleteProduct}) => {
    const { product, color, price, quantity } = item; // Access product and other properties directly
    const dispatch = useDispatch();
    console.log(item);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id: item._id, quantity: newQuantity })); // Use item._id to update quantity
        }
    };

    return (
        <tr className="align-middle">
            <td>
                <img
                    src={product?.imageCover || "default.jpg"} // Use the product image if available, else a default
                    alt={product?.title || "Product"}
                    style={{ width: "50px" }}
                />
                <span>{product?.title || "Product Title"}</span>
            </td>
            <td>${price}</td>
            <td>
                <div
                    className="w-25 rounded-circle"
                    style={{ backgroundColor: color, height: "20px" }}
                ></div>
            </td>
            <td>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="form-control"
                    style={{ width: "60px" }}
                />
            </td>
            <td>${quantity * price}</td>
            <td>
                <button
                    onClick={() => DeleteProduct(item._id)} 
                    className="btn rounded-circle"
                    style={{ backgroundColor: "#EF9E86" }}
                >
                    <i className="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    );
};

export default CartItem;
