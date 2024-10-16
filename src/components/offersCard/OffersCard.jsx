import React from 'react'
import styles from './offersCard.module.css'
const OffersCard = ({offerMonth, offer, offerTime ,img}) => {
    return (
        <div className={styles.offerCard}>
            <div className={styles.offerText}>
                <p >{offerMonth} </p>
                <h2>{offer}</h2>
                <button>view more <i class="fa-solid fa-arrow-right"></i></button>
                {
                    offerTime&&(
                        <div className={styles.offerTime}>
                            <div className={styles.countdown}>
                        
                                <div className={styles.countdownNumber}>
                                    <p>Sec</p>
                                    <span>00</span>
                                </div>
                                <div className={styles.countdownNumber}>
                                    <p>Min</p>
                                    <span>00</span>
                                </div>
                                <div className={styles.countdownNumber}>
                                    <p>Hou</p>
                                    <span>00</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <img src={img}  />
        </div>
    )
}

export default OffersCard
