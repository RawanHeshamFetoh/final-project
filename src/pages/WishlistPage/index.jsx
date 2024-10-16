import React, { useState, useEffect } from 'react';
import Header from "../../components/Title/Header";
import wishlistBanner from "../../assets/cart_banner.png";
import ProductCard from '../../components/productCard/ProductCard';
import axios from "axios";
import styles from './wishlistPage.module.css';
import { useDispatch } from "react-redux"; 
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { addToWishlist } from "../../redux/wishlistSlice"; 
import { useQueryClient } from 'react-query';

const WishlistPage = () => {
    const [products, setProducts] = useState([]); // Ensure products is initialized as an array
    const dispatch = useDispatch(); // Define dispatch

    const queryClient = useQueryClient();
    // Fetch wishlist items from the server
    const fetchWishlist = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/wishlist", {
                withCredentials: true

            });
            // Check if the response contains the expected data
            const fetchedProducts = response?.data?.data || []; // Ensure fallback to empty array
            console.log("wishlist items response:", response.data);
            setProducts(fetchedProducts); // Update products state with wishlist items
            queryClient.refetchQueries("wish length");
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };


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
            toast.success("Product added to Wishlist");
        } catch (error) {
            console.error("Error adding product to Wishlist:", error);
            toast.error("please Login First");
        }
    };

    // Fetch wishlist items on component mount
    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <div>
            <Header
                title={"Wishlist"}
                details={"Home > Wishlist"}
                imgPath={wishlistBanner}
            />
            <div className="container mt-4">
                <h2>Total Wishlist Items: {products.length}</h2>
                <div className="row">
                    {Array.isArray(products) && products.length > 0 ? (
                        products?.map((product) => (
                            <div key={product._id} className={`col-md-3 ${styles.productSellerContainer}`}>
                                <ProductCard
                                    id={product._id}
                                    className={styles.product}
                                    title={product.title}
                                    price={Math.round(product.price)}
                                    rate={product.ratingsAverage}
                                    img={product.imageCover}
                                    color={product.colors?.[0] || ""}
                                    priceAfterDisc={product.priceAfterDisc}
                                    onAddToWishlist={() => handleAddToWishlist(product)} // Pass handler to ProductCard
                                />
                            </div>
                        ))
                    ) : (
                        <div>
                            <img src={require('../../assets/wishlist-empty.png')} alt="Your wishlist is empty."
                                className={styles.fixedSizeImg} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
