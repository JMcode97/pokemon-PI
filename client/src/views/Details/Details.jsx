import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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
    }, [])
    
    return(
        <>
            
        </>
    )
}

export default Details