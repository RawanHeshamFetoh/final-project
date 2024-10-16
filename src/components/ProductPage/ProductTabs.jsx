import React, { useEffect, useState } from 'react';
import axios from "axios";

import { useSelector } from 'react-redux';

const ProductTabs = () => {
    const [activeTab, setActiveTab] = useState('description');
    // const { products } = useSelector((state) => state.allproducts);


    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/products");
        const data = await response.data.data.documents;
        console.log(response.data.data.documents);
        setProducts(data);
        console.log(products);
    };
    useEffect(() => {
        fetchProducts();
    }, []);


    if (!products || products.length === 0) {
        return <p>No products available.</p>;
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
                        <p>{products[0].description}</p>
                    </div>
                )}
                {activeTab === 'details' && (
                    <div id="details" className="tab-pane fade show active">
                        <p>{products[0].details}</p>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div id="reviews" className="tab-pane fade show active">
                        <p>{products[0].reviews}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;
