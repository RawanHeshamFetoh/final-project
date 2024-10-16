import React, { useEffect, useState } from 'react'
import ProductDetails from '../../components/ProductPage/ProductDetails';
import axios from 'axios';

import ProductTabs from '../../components/ProductPage/ProductTabs';
import styles from './productPage.module.css';
import ProductSlider from '../../components/slider/productSlider';
import ProductCard from "../../components/productCard/ProductCard";



const ProductPage = () => {
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
    return (
        <div className="container my-5">
            <div className="row">
                <ProductDetails />
            </div>

            <div className="row">
                <ProductTabs />
            </div>
            <div className={styles.homeTopic}>
                <h1 >Similar Products You Like</h1>
                <div></div>
            </div>

            
            {/* هذا ال productSlider فيه مشكله و مش عارف اي هي */}
            {/* <div className='container'>
                <ProductSlider products={products} />
            </div> */}

            <div className="row img-fluid">
                <div className={`container ${styles.productsCollection}`}>
                    {products.map(
                        (product, i) =>
                            i < 4 && (
                                <ProductCard
                                    key={product.id}
                                    className={styles.product}
                                    title={product.title}
                                    price={Math.round(product.price)}
                                    rate={Math.round(product.rating)}
                                    img={product.imageCover}
                                />
                            )
                    )}
                </div>
            </div>


        </div>

    );
};

export default ProductPage;
