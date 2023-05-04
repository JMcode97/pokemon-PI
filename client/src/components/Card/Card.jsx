import React from "react";
import styles from './styles.module.css'

const Card = ({ image, name, types }) => {
    return(
        <>
            <div
            className={styles.container} >
                <div
                className={styles.image} >
                    <img src={image} alt="pokemon" />
                </div>
                <div
                className={styles.info} >
                    <h1>{name}</h1>
                    <div>
                        {
                            types?.map(type => {
                                return(
                                    <span
                                    key={type}
                                    style={{ backgroundColor: `var(--${type})`}} >
                                        {type}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card