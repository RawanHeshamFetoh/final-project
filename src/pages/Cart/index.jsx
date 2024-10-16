import React from "react";
import Header from "../../components/Title/Header";
import cartBanner from "../../assets/cart_banner.png";
import CartList from "../../components/CartPage/CartList";
import CartSummary from "../../components/CartPage/CartSummary";
import styles from "./";
import { Link } from "react-router-dom";


const CartPage = () => {
    return (
        <div>
            <Header
                title={"Cart-Page"}
                details={"Home > Cart-Page"}
                imgPath={cartBanner}
            />

            <div className="container mt-5">
                <h2>Total Cart Item:</h2>
                <div className="row">
                    <div className="col-md-8">
                        <CartList />
                    </div>
                    <div className="col-md-4">
                        <CartSummary />
                    </div>
                </div>
                {/* <div className="row mt-3">
                    <div className="col-md-8 d-flex justify-content-between">
                    <Link to="/">

                        <button
                            className="btn text-white"
                            style={{
                                backgroundColor: "#EF9E86",
                                borderRadius: "5px",
                            }}
                        >
                            Continue Shopping
                        </button>
                        </Link>
                        <button className="btn btn-outline-secondary">Clear Cart</button>
                    </div>
                </div> */}

                <div className="row text-center mt-5">
                        <div className="col-2">
                            <img src={require('../../assets/Nike-Logo.jpg')} alt="Adidas" className={`img-fluid ${styles.fixedSizeImg}`} />
                        </div>
                        <div className="col-2">
                            <img src={require('../../assets/puma-logo-9869295F1B-seeklogo.com.png')} alt="Givenchy" className={`img-fluid ${styles.fixedSizeImg}`} />
                        </div>
                        <div className="col-2">
                            <img src={require('../../assets/Dior_Logo.svg.png')} alt="Dior" className={`img-fluid ${styles.fixedSizeImg}`} />
                        </div>
                        <div className="col-2">
                            <img src={require('../../assets/Gucci-Logo.png')} alt="Gucci" className={`img-fluid ${styles.fixedSizeImg}`} />
                        </div>
                        <div className="col-2">
                            <img src={require('../../assets/Givenchy_logo.jpg')} alt="Givenchy" className={`img-fluid ${styles.fixedSizeImg}`} />
                        </div>
                        <div className="col-2">
                            <img src={require('../../assets/town-team-logo.avif')} alt="Givenchy" className={`img-fluid ${styles.fixedSizeImg}`} />
                        </div>
                        
                    </div>



            </div>
        </div>
    );
};

export default CartPage;
