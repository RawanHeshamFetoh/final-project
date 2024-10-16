import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom'; // Import useParams to get the dynamic id

const ProductTabs = () => {
    const { _id } = useParams(); // Get product id from URL
    const [activeTab, setActiveTab] = useState('description');
    const [product, setProduct] = useState(null); // State to store the specific product

    // Fetch product by ID from the URL
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/products/${_id}`);
            const data = response.data.data; // Assuming product data is directly in data
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [_id]); // Re-fetch product when id changes

    // Show loading or error if product isn't loaded yet
    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="product-tabs mt-4">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link shadow ${activeTab === 'description' ? ' text-white' : 'bg-light text-dark'} ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => setActiveTab('description')}
                        style={{
                            borderRadius: "5px",
                            backgroundColor: "#EF9E86",
                        }}
                    >
                        Product Description
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'details' ? 'text-white active' : 'bg-light text-dark'}`}
                        onClick={() => setActiveTab('details')}
                        style={{
                            borderRadius: "5px",
                            marginLeft: "20px",
                            backgroundColor: "#EF9E86",
                        }}
                    >
                        Product Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'reviews' ? ' text-white active' : 'bg-light text-dark'}`}
                        onClick={() => setActiveTab('reviews')}
                        style={{
                            borderRadius: "5px",
                            marginLeft: "20px",
                            backgroundColor: "#EF9E86",
                        }}
                    >
                        Product Reviews
                    </button>
                </li>
            </ul>

            <div className="tab-content mt-3">
                {activeTab === 'description' && (
                    <div id="description" className="tab-pane fade show active">
                        <p>{product.description}</p>
                    </div>
                )}
                {activeTab === 'details' && (
                    <div id="details" className="tab-pane fade show active">
                        <p>{product.details}</p>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div id="reviews" className="tab-pane fade show active">
                        <p>{product.reviews}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
