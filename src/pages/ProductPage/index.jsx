import React, { useState } from "react";
import ProductDetails from "../../components/ProductPage/ProductDetails";
import axios from "axios";
import ProductTabs from "../../components/ProductPage/ProductTabs";
import styles from "./productPage.module.css";
import ProductSlider from "../../components/slider/productSlider";
import { useQuery } from "react-query";
import { useQueryClient } from 'react-query';


const ProductPage = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const response = await axios.get(`http://localhost:3000/api/v1/products/`, {
            withCredentials: true,
        });
        return response.data;
    };
    const { isLoading, isError, error, data } = useQuery(
        "products",
        getProducts,
        {
            onError: (err) => console.error(err),
            onSuccess: (res) => {
                setProducts(res.data.documents);
                console.log(res.data.documents, "full");
            },
        }
    );

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
                <h1>Similar Products You Like</h1>
                <div></div>
            </div>
            <div className="container">
                <ProductSlider products={products} />
            </div>
        </div>
    );
};

export default ProductPage;
