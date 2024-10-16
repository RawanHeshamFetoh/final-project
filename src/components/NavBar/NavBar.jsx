import React from 'react'
import styles from './navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
const NavBar = () => {
    // const userId = useSelector((state) => state.user.userId);
    const userId = Cookies.get('userId')
    return (
        <div className={styles.nav}>
            <div className={styles.firstNav}>
                <div className={`container ${styles.firstNavContainer} ${styles.flexContainer}`}>
                    <p>new offers this month only to get 20% free</p>
                    {/* <div className='d-flex justify-content-between'>
                        <select name="country" id="language">
                            <option value="usd" selected> usd</option>
                            <option value="egypt"> egypt</option>
                        </select>
                        <select name="language" id="language">
                            <option value="arabic"> arabic</option>
                            <option value="english" selected> english</option>
                        </select>
                        <div className={styles.firstNavIcon}>
                            <div><i className="fa-brands fa-facebook-f"></i></div>
                            <div><i className="fa-brands fa-instagram"></i></div>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* second nav */}
            <div className={styles.secondNav}>
                <div className={`container ${styles.secondNavContainer} ${styles.flexContainer}`}>
                    <img src={require("../../assets/logo e.PNG")} alt="" />
                    {/* <div className={styles.flexContainer}> */}
                    <div className={styles.flexContainer}>
                        <div className={styles.search}>
                            {/* <select name="categories" id="categories">
                                <option value="women"> women</option>
                                <option value="men" selected> men</option>
                            </select> */}
                            <input type="text" name="search" id="search" placeholder='search your product' />
                        </div>
                        <button>search</button>
                        </div>
                        {userId ?
                            (<div className={`${styles.flexContainer} ${styles.navIcon}`}>
                                <div><NavLink to={`/profile/${userId}`}> <i className="fa-regular fa-user"></i> </NavLink></div>
                                <div className='position-relative'>
                                    <i className="fa-regular fa-heart"></i>
                                    <span className="position-absolute top-0 translate-middle bg-danger  rounded-circle">
                                        <span >10</span>
                                    </span>
                                </div>
                                <div className='position-relative'>
                                    <i className="fa-solid fa-shopping-cart "></i>
                                    <span className="position-absolute top-0  translate-middle bg-danger  rounded-circle">
                                        <span >10</span>
                                    </span>
                                </div>
                            </div>) :
                            (<div className={`${styles.flexContainer} ${styles.navIcon}`}>
                                <div><NavLink to={`/login`} className={styles.loginBtns}> login </NavLink></div>
                                <div><NavLink to={`/signUp`} className={styles.loginBtns}> sign up </NavLink></div>
                            </div>
                            )
                        }
                    {/* </div> */}
                </div>
            </div>
            {/* last nav */}
            <nav className={`navbar navbar-expand-lg py-0  ${styles.thirdNav}`}>
                <div className={`container ${styles.flexContainer}`}>
                    <div className={styles.selectCategories}>
                        <select name="categories" id="categories">
                            <option value="allCategories" selected> all categories</option>
                            <option value="women"> women</option>
                            <option value="men" > men</option>
                        </select>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse  ${styles.navLink}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `${isActive ? styles.activeLink : ''} ${styles.navLinkColor}`} to="/">Home</NavLink>                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `${isActive ? styles.activeLink : ''} ${styles.navLinkColor}`} aria-current="page" to="/about">about us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={` ${styles.navLinkColor}`} aria-current="page" to="#">pages</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={` ${styles.navLinkColor}`} aria-current="page" to="#">shop</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={` ${styles.navLinkColor}`} aria-current="page" to="#">blog</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `${isActive ? styles.activeLink : ''} ${styles.navLinkColor}`
                                    }
                                    to="/contact-us"
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                        <div className={`${styles.call} ${styles.flexContainer}`}>
                            <i class="fa-solid fa-phone"></i>
                            <div className={styles.callText}>
                                <p>call now</p>
                                <p>01001865858</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
