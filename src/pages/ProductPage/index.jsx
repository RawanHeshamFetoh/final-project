import React, { useEffect, useState } from 'react'
import ProductDetails from '../../components/ProductPage/ProductDetails';
import axios from 'axios';
import ProductTabs from '../../components/ProductPage/ProductTabs';
import styles from './productPage.module.css';
import ProductSlider from '../../components/slider/productSlider';
import ProductCard from "../../components/productCard/ProductCard";
import { useParams } from 'react-router-dom';
import { addToWishlist } from "../../redux/wishlistSlice";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';


const ProductPage = () => {
    const { id } = useParams();
    const [products, setProducts] = useState({});
    const fetchProducts = async () => {
        const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);

        const data = await response.data.data;
        console.log(response.data);
        console.log("response", response);
        setProducts(data);
        console.log("products", products);
    };





    useEffect(() => {
        fetchProducts();

    }, []);

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const handleAddToWishlist = async (productToAdd) => {
        try {
            // Send the product to the server
            await axios.post(
                "http://localhost:3000/api/v1/wishlist",
                { productId: productToAdd }, // Send the product details to the server
                { withCredentials: true }
            );

            // Dispatch the action to update the wishlist in Redux
            dispatch(addToWishlist(productToAdd));
            queryClient.refetchQueries("wish length");
            toast.success("Product added to Wishlist");
        } catch (error) {
            console.error("Error adding product to Wishlist:", error);
            toast.error("please Login First");
        }
    };

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

                    <div className={styles.productSellerContainer}>
                        <ProductCard
                            id={products._id}
                            className={styles.product}
                            title={products.title}
                            price={Math.round(products.price)}
                            rate={products.ratingsAverage}
                            img={products.imageCover}
                            onAddToWishlist={() => handleAddToWishlist(id)}
                        />
                    </div>



                </div>
            </div>


        </div>

    );
};

export default ProductPage;
