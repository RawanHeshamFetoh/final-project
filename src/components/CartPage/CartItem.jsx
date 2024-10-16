import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity } from '../../redux/cartSlice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    };

    return (
        <tr>
            <td>
                <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                <span>{item.name}</span>
                <p>{item.color}</p>
            </td>
            <td>${item.price}</td>
            <td>
                <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    className="form-control"
                    style={{ width: '60px' }}
                />
            </td>
            <td>${item.price * item.quantity}</td>
        </tr>
    );
};

export default CartItem;
