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
                    <Link to='/home'>
                        <button>HOME</button>
                    </Link>
                    </div> 
                ) : (null)
            }
        </>
    )
}

export default NavBar