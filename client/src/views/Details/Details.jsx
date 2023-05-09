import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from './styles.module.css'

const Details = () => {
    const { pokemon } = useParams()
    const [pokemonData, setPokemonData] = useState()

    const getPokemon = async (pokemon) => {
        let regexUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

        if(!isNaN(pokemon) || regexUUID.test(pokemon)) {
            return await axios.get(`http://localhost:3001/pokemons/${pokemon}`)
            .then(res => setPokemonData(res.data))
        }
        if(typeof pokemon === 'string') {
            return await axios.get(`http://localhost:3001/pokemons?name=${pokemon}`)
            .then(res => setPokemonData(res.data))
        }
    }

    useEffect(() => {
        getPokemon(pokemon)
    }, [pokemon])
    
    return(
        <>
            <div
            className={styles.container} >
                <div
                className={styles.detailsContainer} >
                    <div
                    className={styles.title} >
                        <h1>{pokemonData?.name}</h1>
                        <span>#{pokemonData?.id}</span>
                    </div>
                    <div
                    className={styles.info} >
                        <div>
                            <img 
                            id={styles.pokemonImage}
                            src={pokemonData?.image} 
                            alt={pokemonData?.name} />
                        </div>
                        <div
                        className={styles.stats} >
                            <div
                            className={styles.infoStats} >
                                <div
                                className={styles.statsName} >
                                    <span>hp</span>
                                    <span>attack</span>
                                    <span>defense</span>
                                    <span>speed</span>
                                    <span>height</span>
                                    <span>weight</span>
                                </div>
                                <div
                                className={styles.statsValue} >
                                    <span>{pokemonData?.hp}</span>
                                    <span>{pokemonData?.attack}</span>
                                    <span>{pokemonData?.defense}</span>
                                    <span>{pokemonData?.speed}</span>
                                    <span>{pokemonData?.height}</span>
                                    <span>{pokemonData?.weight}</span>              
                                </div>
                            </div> 
                            <div
                            className={styles.statsTypes} >
                                {
                                    pokemonData?.types.map((type, index) => {
                                        return (
                                            <span
                                            key={index}
                                            style={{ backgroundColor: `var(--${type})`}} >
                                            {type}
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details