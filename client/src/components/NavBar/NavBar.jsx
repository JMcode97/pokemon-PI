import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './styles.module.css'

const NavBar = () => {
    let { pathname } = useLocation()

    return(
        <>
            {
                pathname !== '/' ? (
                    <div
                    className={styles.container}>
                    <h3>Soy la barra de navegacion!</h3>
                    <button>
                        <Link to='/home'>Home</Link>
                    </button>
                    </div> 
                ) : (null)
            }
        </>
    )
}

export default NavBar