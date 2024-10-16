import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useMutation } from "react-query";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";



const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1); // Initialize quantity state
    const { id } = useParams(); // Get product id from the URL
    const [product, setProduct] = useState(null); // State to store the specific product
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const dispatch = useDispatch();

    // Function to handle Add to Cart and send the product to the server
    const handleAddToCart = async (productToAdd) => {

        console.log(productToAdd)
        try {
            // Send the product to the server
            const response = await axios.post(
                "http://localhost:3000/api/v1/cart", 
                productToAdd, // Send the product details to the server
                { withCredentials: true }
            );
            // console.log(response)
            // Update the Redux store only after successfully adding to the server
            dispatch(addToCart(productToAdd));
            console.log("Product added to cart on server and Redux:", productToAdd);
            toast.success("Product added to cart")


            console.log("Product added to cart on server:",response.data)
            return response.data;
        } catch (error) {
            console.error("Error adding product to cart:", error);
            throw error; // Ensure error is handled by mutation
        }
    };

    // Prepare the product to be sent to both server and Redux
    const mutation = useMutation(() => {
        if (product) {
            const productToAdd = {
                productId: product._id, // Use `_id` to identify the product
                color: product.colors[0],
                // img: product.imageCover,
                // title: product.title,
                // price: product.price,
                // priceAfterDisc: product.priceAfterDisc,
                // quantity: quantity, // Include selected quantity
            };

            return handleAddToCart(productToAdd); // Call handleAddToCart to send to server and Redux
        }
    });

    // Fetch product details from the server
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:3000/api/v1/products/${id}`
            );
            const data = response.data.data;
            setProduct(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Failed to load product details.");
            setLoading(false);
        }
    };

    // Fetch product when component mounts and when the _id changes
    useEffect(() => {
        fetchProduct();
    }, [id]);

    // Show loading or error states
    if (loading) {
        return <p>Loading product details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // If product is not found
    if (!product) {
        return <p>Product not found.</p>;
    }

    // Increment quantity
    const increment = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    // Decrement quantity, ensuring it doesn't go below 1
    const decrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };
    
    return (
        <Row className="product-details mt-4">
            {/* Product Gallery */}
            <Col md={2}>
                <div
                    className="product-gallery col-md-9"
                    style={{ maxWidth: "90%", padding: "1px" }}
                >
                    <div className=" mb-1">
                        <img
                            src={product.imageCover}
                            alt={product.title}
                            className="img-fluid "
                        />
                    </div>
                    <div className=" mb-1">
                        <img
                            src={product.imageCover}
                            alt={product.title}
                            className="img-fluid "
                        />
                    </div>
                    <div className=" mb-1">
                        <img
                            src={product.imageCover}
                            alt={product.title}
                            className="img-fluid"
                        />
                    </div>
                    <div className=" mb-1">
                        <img
                            src={product.imageCover}
                            alt={product.title}
                            className="img-fluid"
                        />
                    </div>
                </div>
            </Col>

            {/* Product Main Image */}
            <Col md={5}>
                <div className="product-main-image">
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

            {/* Product Details */}
            <Col md={5}>
                <div className="product-details-content">
                    <h2>
                        {product.title}
                        <span
                            className="badge ms-3 text-dark"
                            style={{
                                backgroundColor: "#EF9E86",
                                borderRadius: "0",
                            }}
                        >
                            {product.availability}
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
                                    ${product.price}
                                    <span className="ms-5" style={{ color: "#EF9E86" }}>
                                        {product.priceAfterDisc} Off
                                    </span>
                                </h5>
                            </div>
                            <div className="mb-3">
                                <h5>{product.colors?.join(', ') || 'Unavailable'}</h5>
                            </div>
                            <div className="mb-3">
                                <h5>
                                    <span className="ms-3">{product.size}</span>{" "}
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
                                        {product.stock} items in stock
                                    </span>
                                </h5>
                            </div>
                        </Col>
                    </Row>

                    <div className="product-actions mt-4">
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
                            onClick={() => mutation.mutate()} 
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
