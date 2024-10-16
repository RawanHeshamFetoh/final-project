import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateShippingCost } from '../../redux/cartSlice';
const CartSummary = () => {
    const { subtotal, shippingCost, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleShippingChange = (e) => {
        dispatch(updateShippingCost(Number(e.target.value)));
    };

    return (
        <div className="border p-3">
            <h4>Cart Totals</h4>
            <p>Subtotal: <strong>${subtotal}</strong></p>
            <p>Shipping:
                <div>
                    <label>
                        <input type="radio" name="shipping" value="120" checked={shippingCost === 120} onChange={handleShippingChange} />
                        Free Delivery - $120
                    </label><br />
                    <label>
                        <input type="radio" name="shipping" value="80" onChange={handleShippingChange} />
                        Flat Rate - $80
                    </label><br />
                    <label>
                        <input type="radio" name="shipping" value="50" onChange={handleShippingChange} />
                        Local Area - $50
                    </label>
                </div>
            </p>
            <p>Total: <strong>${total}</strong></p>
            <button className="btn text-white" style={{
                backgroundColor: "#EF9E86",
                borderRadius: "5px",
            }}>Proceed to Checkout</button>
        </div>
    );
};

export default CartSummary;
