import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
import axios from "axios";

// const { products } = useSelector((state) => state.allproducts);

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1); // Initialize quantity state
    const { id } = useParams();
    const dispatch = useDispatch();

    // Get products and status from the Redux store
    const products = useSelector((state) => state.products.items);
    const productStatus = useSelector((state) => state.products.status);
    const product = products.find((prod) => prod.id === parseInt(id)); // Find product by dynamic id

    // Fetch products on mount if the status is idle
    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, productStatus]);

    // Increment quantity
    const increment = () => {
        setQuantity(quantity + 1);
    };

    // Decrement quantity, ensuring it doesn't go below 1
    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Show loading message if products are still being fetched
    if (productStatus === 'loading') {
        return <p>Loading...</p>;
    }

    // Show error message if fetching products failed
    if (productStatus === 'failed') {
        return <p>Failed to load products.</p>;
    }

    // If no products or product with this id not found
    if (!product) {
        return <p>Product not found.</p>;
    }
    return (
        <Row className="product-details mt-4 ">
            <Col md={2}>
                <div
                    className="product-gallery col-md-9"
                    style={{ maxWidth: "90%", padding: "1px" }}
                >
                    <div className=" mb-1">
                        <img
                            src={products[1].images}
                            alt={products[1].title}
                            className="img-fluid "
                        />
                    </div>
                    <div className=" mb-1">
                        <img
                            src={products[1].images}
                            alt={products[1].title}
                            className="img-fluid "
                        />
                    </div>
                    <div className=" mb-1">
                        <img
                            src={products[1].images}
                            alt={products[1].title}
                            className="img-fluid"
                        />
                    </div>
                    <div className=" mb-1">
                        <img
                            src={products[1].images}
                            alt={products[1].title}
                            className="img-fluid"
                        />
                    </div>
                </div>
            </Col>
            <Col md={5}>
                <div>
                    {product ? (
                        <img
                            src={product.imageCover}
                            alt={product.title}
                            className="img-fluid"
                        />
                    ) : (
                        <p>Product not found</p>
                    )}
                </div>
            </Col>
            <Col md={5}>
                <div className="product-details-content">
                    <h2>
                        {products[1].title}
                        <span
                            className="badge ms-3 text-dark"
                            style={{
                                backgroundColor: "#EF9E86",
                                borderRadius: "0",
                            }}
                        >
                            {products[1].availability}
                        </span>
                    </h2>

                    <Row>
                        <Col md={4}>
                            <div className="mb-3">
                                <h5>Price</h5>
                            </div>
                            <div className="mb-3">
                                <h5>Color</h5>
                            </div>
                            <div className="mb-3">
                                <h5>Size</h5>
                            </div>
                            <div className="mb-3">
                                <h5>Quantity</h5>
                            </div>
                            <div className="mb-3">
                                <h5>Availability</h5>
                            </div>
                        </Col>
                        <Col md={2}>
                            <div className="mb-3">
                                <h5>:</h5>
                            </div>
                            <div className="mb-3">
                                <h5>:</h5>
                            </div>
                            <div className="mb-3">
                                <h5>:</h5>
                            </div>
                            <div className="mb-3">
                                <h5>:</h5>
                            </div>
                            <div className="mb-3">
                                <h5>:</h5>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div>
                                <h5>
                                    ${products[1].price}
                                    <span className="ms-1" style={{ color: "#EF9E86" }}>
                                        {products[0].discount} Off
                                    </span>
                                </h5>
                            </div>
                            <div className="mb-3">
                                <h5>{products[1].colors}</h5>
                            </div>
                            <div className="mb-3">
                                <h5>
                                    <span className="ms-3">{products[1].size}</span>{" "}
                                </h5>
                            </div>
                            <div className="mb-3">
                                <p>
                                    <button className="btn btn-light mx-1" onClick={decrement}>
                                        -
                                    </button>
                                    {quantity.toString().padStart(2, "0")}
                                    <button className="btn btn-light mx-2" onClick={increment}>
                                        +
                                    </button>
                                </p>
                            </div>
                            <div className="mb-3">
                                <h5>
                                    <span style={{ color: "#EF9E86" }}>
                                        {products[1].stock}  items in stock
                                    </span>
                                </h5>
                            </div>
                        </Col>
                    </Row>

                    <div className="product-actions mt-4 ">
                        <button
                            className="btn btn-lg me-3 shadow"
                            style={{
                                backgroundColor: "#EF9E86",
                                borderRadius: "5px",
                            }}
                        >
                            Buy Now
                        </button>
                        <button
                            className="btn btn-outline-secondary btn-lg shadow"
                            style={{
                                borderRadius: "5px",
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default ProductDetails;
