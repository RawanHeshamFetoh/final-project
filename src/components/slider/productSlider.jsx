// import React from 'react';
// import styles from './productSlider.module.css';

// const ProductSlider = () => {
//   return (
//     <div className={`container ${styles.sliderContainer}`}>
//       <input type="radio" name="slider" id="slide-1-trigger" className={styles.trigger} checked />
//       <label className={styles.btn} htmlFor="slide-1-trigger"></label>
//       <input type="radio" name="slider" id="slide-2-trigger" className={styles.trigger} />
//       <label className={styles.btn} htmlFor="slide-2-trigger"></label>
//       <input type="radio" name="slider" id="slide-3-trigger" className={styles.trigger} />
//       <label className={styles.btn} htmlFor="slide-3-trigger"></label>
//       <input type="radio" name="slider" id="slide-4-trigger" className={styles.trigger} />
//       <label className={styles.btn} htmlFor="slide-4-trigger"></label>

//       <div className={styles.slideWrapper}>
//         <div className={styles.slideRole}>
//           <div className={`${styles.slide} ${styles.slide1}`}>
//             <img src="https://via.placeholder.com/350x150?text=Slide1" alt="Slide 1" />
//             11
//           </div>
//           <div className={`${styles.slide} ${styles.slide2}`}>
//             <img src="https://via.placeholder.com/350x150?text=Slide2" alt="Slide 2" />
//             22
//           </div>
//           <div className={`${styles.slide} ${styles.slide3}`}>
//             {/* <img src="https://via.placeholder.com/350x150?text=Slide3" alt="Slide 3" /> */}
//             33
//           </div>
//           <div className={`${styles.slide} ${styles.slide4}`}>
//             {/* <img src="https://via.placeholder.com/350x150?text=Slide4" alt="Slide 4" /> */}
//           44
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductSlider;

// import React from 'react'

// const ProductSlider = (products) => {
//   return (
//     <div>
//       <div id="ProductCursol" class="carousel carousel-dark slide" data-bs-ride="carousel">
//   <div class="carousel-indicators">
//     <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
//     <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
//     <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
//   </div>
//   <div class="carousel-inner">
//     <div class="carousel-item active" data-bs-interval="10000">
//       <img src="..." class="d-block w-100" alt="..."/>
//       <div class="carousel-caption d-none d-md-block">
//         <h5>First slide label</h5>
//         <p>Some representative placeholder content for the first slide.</p>
//       </div>
//     </div>
//     <div class="carousel-item" data-bs-interval="2000">
//       <img src="..." class="d-block w-100" alt="..."/>
//       <div class="carousel-caption d-none d-md-block">
//         <h5>Second slide label</h5>
//         <p>Some representative placeholder content for the second slide.</p>
//       </div>
//     </div>
//     <div class="carousel-item">
//       <img src="..." class="d-block w-100" alt="..."/>
//       <div class="carousel-caption d-none d-md-block">
//         <h5>Third slide label</h5>
//         <p>Some representative placeholder content for the third slide.</p>
//       </div>
//     </div>
//   </div>
//   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Previous</span>
//   </button>
//   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Next</span>
//   </button>
// </div>
//     </div>
//   )
// }

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are imported
import ProductCard from '../productCard/ProductCard';
import styles from './productSlider.module.css'

const ProductSlider = ({ products }) => {
    // Function to chunk products into groups of four
    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    // Chunk products into groups of four
    const productChunks = chunkArray(products, 4);

    return (
        <div >
            <div id="ProductCursol" className={`carousel carousel-dark slide ${styles.productSlider}`} data-bs-ride="carousel">
                <div className={`carousel-indicators ${styles.indecator}`}>
                    {productChunks.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#ProductCursol"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {productChunks.map((chunk, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            data-bs-interval="10000"
                        >
                            <div className={styles.sliderContent}>
                                {chunk.map(product => (
                                    <div className={styles.psroductSliderCardsContainer}>
                                    <ProductCard key={product.id} title={product.title} price={product.price} rate={product.ratingsAverage} img={product.imageCover} priceAfterDisc={product.priceAfterDisc} />
                                    </div>
                                    
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#ProductCursol"
                    data-bs-slide="prev"
                >

                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#ProductCursol"
                    data-bs-slide="next"
                >

                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default ProductSlider;
