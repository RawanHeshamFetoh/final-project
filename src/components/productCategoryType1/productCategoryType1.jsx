import React from 'react'
import styles from './productCategoryType1.module.css'
const ProductCategoryType1 = ({ img, title }) => {
    return (
        <div className={styles.productCategoryType1}>
            <img src={img} alt={title} />
            <h4>{title}</h4>
            <button>view more <i class="fa-solid fa-arrow-right"></i></button>
        </div>
    )
}

export default ProductCategoryType1
