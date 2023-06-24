import React from "react";
import styles from './styles.module.css'
import { Link } from "react-router-dom";
import logo from '../../assets/pokemonLogo.png'

const Landing = () => {
    return(
        <>
            <div
            className={styles.container} >
                <div
                className={styles.box} >
                    <img src={logo} alt="logo" />
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