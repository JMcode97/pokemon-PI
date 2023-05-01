import React, { useEffect, useState } from "react";
import styles from './styles.module.css'
import axios from 'axios'
import Card from "../Card/Card";

const Home = () => {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/pokemons')
        .then(({ data }) => setPokemons(data))
    }, [])

    return(
        <>
            <div
            className={styles.container} >
                {
                    pokemons?.map(({id, name, image, types}) => {
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
        </>
    )
}

export default Home