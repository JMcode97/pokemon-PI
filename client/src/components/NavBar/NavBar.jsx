import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './styles.module.css'
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";

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
                            <Link to='/create'>
                                <button>CREAR</button>
                            </Link>
                        </div>
                        <div>
                            <SearchBar />
                        </div>
                        <div>
                            <Filters />
                        </div>
                    </div> 
                ) : (null)
            }
        </>
    )
}

export default NavBar