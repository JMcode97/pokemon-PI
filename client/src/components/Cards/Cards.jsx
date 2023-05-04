import { useState } from 'react'
import Card from '../Card/Card'
import styles from './styles.module.css'

const Cards = ({ pokemons }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 12
    const lastCardsIndex = currentPage * cardsPerPage
    const firstCardsIndex = lastCardsIndex - cardsPerPage
    const currentCards = pokemons.slice(firstCardsIndex, lastCardsIndex)

    let pages = []
    for(let i = 1; i <= Math.ceil(pokemons.length/cardsPerPage); i++) {
        pages.push(i)
    }

    return(
        <>
            <div
            className={styles.container} >
                <div
                className={styles.cards}>
                    {
                        currentCards?.map(({id, name, image, types}) => {
                            return(
                                <Card 
                                key={id}
                                name={name}
                                image={image}
                                types={types} />
                            )
                        })
                    }
                </div>
                <div
                className={styles.pageButtons} >
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
            </div>
        </>
    )
}

export default Cards