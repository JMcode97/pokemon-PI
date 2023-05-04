import React, { useEffect } from "react";
// import styles from './styles.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions";
import Cards from "../../components/Cards/Cards";

const Home = () => {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.allPokemons)

    useEffect(() => {
        dispatch(getPokemons())
    }, [])

    return(
        <>
            <Cards pokemons={pokemons} />
        </>
    )
}

export default Home