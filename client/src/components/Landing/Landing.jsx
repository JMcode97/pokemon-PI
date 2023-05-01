import React from "react";
import styles from './styles.module.css'
import { Link } from "react-router-dom";

const Landing = () => {
    return(
        <>
            <div
            className={styles.container} >
                <div
                className={styles.box} >
                    <img src={require('../../assets/pokemonLogo.png').default} alt="logo" />
                    <h1>Bienvenid@ a la PokeApp!</h1>
                    <Link to='/home'
                    className={styles.boxButton}>
                        <button>
                            Ingresar
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Landing