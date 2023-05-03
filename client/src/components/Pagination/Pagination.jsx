import React from "react";
import styles from './styles.module.css'

const Pagination = ({ totalCards, cardsPerPage, setCurrentPage, currentPage }) => {
    let pages = []
    for(let i = 1; i <= Math.ceil(totalCards/cardsPerPage); i++) {
        pages.push(i)
    }

    return (
        <>
            <div
            className={styles.container} >
                {
                    pages?.map((page, index) => {
                        return(
                            <button 
                            key={index}
                            className={page === currentPage ? styles.active : null}
                            onClick={() => setCurrentPage(page)} >
                            {page}
                            </button>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Pagination