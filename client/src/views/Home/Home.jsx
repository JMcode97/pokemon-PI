import React, { useEffect } from "react";
import styles from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";

const Home = () => {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.filteredPokemons)

    useEffect(() => {
        dispatch(getPokemons())
    }, [])

    return(
        <>
        <div
        className={styles.container} >
            <Cards pokemons={pokemons} />
        </div>
        </>
    )
}

export default Home