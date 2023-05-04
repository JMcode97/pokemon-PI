import React, { useEffect, useState } from "react";
import styles from './styles.module.css'
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";

const Home = () => {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.allPokemons)
    const [currentPage, setCurrentPage] = useState(1)

    const cardsPerPage = 12
    const lastCardsIndex = currentPage * cardsPerPage
    const firstCardsIndex = lastCardsIndex - cardsPerPage
    const currentCards = pokemons.slice(firstCardsIndex, lastCardsIndex)

    useEffect(() => {
        dispatch(getPokemons())
    }, [])

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
                <div>
                    <Pagination 
                    totalCards={pokemons.length}
                    cardsPerPage={cardsPerPage}
                    setCurrentPage={setCurrentPage} 
                    currentPage={currentPage} />
                </div>
            </div>
        </>
    )
}

export default Home