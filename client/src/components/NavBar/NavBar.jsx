import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './styles.module.css'
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
    let { pathname } = useLocation()

    return(
        <>
            {
                pathname !== '/' ? (
                    <div
                    className={styles.container}>
                        <div>
                            <Link to='/home'>
                                <button>HOME</button>
                            </Link>
                        </div>

                        <div>
                            <SearchBar />
                        </div>
                    </div> 
                ) : (null)
            }
        </>
    )
}

export default NavBar