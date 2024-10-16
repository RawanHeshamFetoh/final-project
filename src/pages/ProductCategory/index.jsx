import React, { useEffect, useState } from "react";
import styles from "./productCategory.module.css";
import Header from "../../components/Title/Header";
import ProductCard from "../../components/productCard/ProductCard";
import { useDispatch } from "react-redux"; // Import useDispatch
import axios from "axios";
import productCat from "../../assets/productCat.avif";
import toast from "react-hot-toast";
import { addToWishlist } from "../../redux/wishlistSlice"; // Import addToWishlist action
import { useLocation } from "react-router-dom";
import { useQueryClient } from "react-query";

const ProductCategory = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch(); // Define dispatch
    const location = useLocation(); // Get location object
    const selectedSubcategoryId = location.state?.subcategoryId;
    const search = location.state?.searchValue




    const fetchProducts = async () => {
        try {
            let url;

            if (selectedSubcategoryId) {
                // Fetch products by subcategory
                url = `http://localhost:3000/api/v1/subcategories/${selectedSubcategoryId}/products/subcategory`;
            } else if (search) {
                // Fetch products by category if subcategory is not selected
                url = `http://localhost:3000/api/v1/products?keyword=${search}`;
            } else {
                // Fetch all products if no specific category or subcategory is selected
                url = "http://localhost:3000/api/v1/products";
            }

            console.log("Fetching products from URL:", url);
            const response = await axios.get(url);
            const data = response.data.data.documents;
            setProducts(data);
            console.log(data, "Fetched products data");
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

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

    useEffect(() => {
        fetchProducts(selectedSubcategoryId); // Fetch products based on subcategory or all if none
    }, [selectedSubcategoryId,search]);

    
    return (
        <div>
            <Header
                title={"Product"}
                details={"Home > Product"}
                imgPath={productCat}
            />

            <div className="container mt-4">
            <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5>Category</h5>
                                <ul className="list-unstyled">
                                    <li>Dress</li>
                                    <li>Accessories</li>
                                    <li>Baby & Kids</li>
                                    <li>Shoes</li>
                                    <li>Jewelry</li>
                                </ul>
                                <h5>Price</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <input type="radio" name="price" /> Under $20
                                    </li>
                                    <li>
                                        <input type="radio" name="price" /> $50-100
                                    </li>
                                    <li>
                                        <input type="radio" name="price" /> $55-110
                                    </li>
                                    <li>
                                        <input type="radio" name="price" /> $60-100
                                    </li>
                                    <li>
                                        <input type="radio" name="price" /> $60-120
                                    </li>
                                </ul>
                                <h5>Color</h5>
                                <div>
                                    <span className="badge bg-danger me-1">&nbsp;</span>
                                    <span className="badge bg-secondary me-1">&nbsp;</span>
                                    <span className="badge bg-warning me-1">&nbsp;</span>
                                </div>
                                <h5 className="mt-4">Size</h5>
                                <ul className="list-unstyled ">
                                    <li>
                                        <input type="checkbox" /> M
                                    </li>
                                    <li>
                                        <input type="checkbox" /> S
                                    </li>
                                    <li>
                                        <input type="checkbox" /> L
                                    </li>
                                    <li>
                                        <input type="checkbox" /> XL
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="col-md-9">
                        <div className="row">
                            <form className="d-flex">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    id="search"
                                    placeholder="Product.."
                                />
                                <button
                                    type="submit"
                                    className="btn  text-white"
                                    style={{
                                        backgroundColor: "#EF9E86",
                                        borderRadius: "5px",
                                    }}
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                        
                        <div className="row">
                            <div className={`container ${styles.productsCollection}`}>
                                {products.map(
                                    (product, i) =>
                                        i < 8 && (
                                            <div
                                                key={product._id}
                                                className={styles.productSellerContainer}
                                            >
                                                <ProductCard
                                                    id={product._id}
                                                    className={styles.product}
                                                    title={product.title}
                                                    price={Math.round(product.price)}
                                                    rate={product.ratingsAverage}
                                                    img={product.imageCover}
                                                    priceAfterDisc={product.priceAfterDisc}
                                                    onAddToWishlist={() => handleAddToWishlist(product)} // Pass handler to ProductCard
                                                />
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Brands */}
                    <div className="row text-center ">
                        <div className="col-2">
                            <img
                                src={require("../../assets/Nike-Logo.jpg")}
                                alt="Adidas"
                                className={`img-fluid ${styles.fixedSizeImg}`}
                            />
                        </div>
                        <div className="col-2">
                            <img src={require('../../assets/puma-logo-9869295F1B-seeklogo.com.png')} alt="Givenchy" className={`img-fluid ${styles.fixedSizeImg}`} />
                        </div>
                        <div className="col-2">
                            <img
                                src={require("../../assets/Dior_Logo.svg.png")}
                                alt="Dior"
                                className={`img-fluid ${styles.fixedSizeImg}`}
                            />
                        </div>
                        <div className="col-2">
                            <img
                                src={require("../../assets/Gucci-Logo.png")}
                                alt="Gucci"
                                className={`img-fluid ${styles.fixedSizeImg}`}
                            />
                        </div>
                        <div className="col-2">
                            <img
                                src={require("../../assets/Givenchy_logo.jpg")}
                                alt="Givenchy"
                                className={`img-fluid ${styles.fixedSizeImg}`}
                            />
                        </div>
                        <div className="col-2">
                            <img
                                src={require("../../assets/town-team-logo.avif")}
                                alt="Givenchy"
                                className={`img-fluid ${styles.fixedSizeImg}`}
                            />
                        </div>
                    </div>

                    <div className="row text-center">
                        <div className={`container ${styles.productsCollection}`}>
                            {products.map(
                                (product, i) =>
                                    i < 4 && (
                                        <div key={product.id}>
                                            <img
                                                src={product.imageCover}
                                                alt={product.title}
                                                className={`img-fluid ${styles.fixedSizeImg}`}
                                            />
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCategory;
