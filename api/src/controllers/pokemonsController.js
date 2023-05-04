const axios = require('axios')
const { Pokemon } = require('../db')

const createPokemonObj = (res) => {
    // crear un objeto por cada pokemon
    let { id, name, weight, height } = res.data
    let pokemonObj = {}
    // array de tipos de pokemon
    let pokemonTypes = res.data.types.map(data => data.type.name)
    // insertar cada stat con su valor en el objeto de pokemon
    res.data.stats.map(el => {
        if(el.stat.name === 'hp' || el.stat.name === 'attack' || el.stat.name === 'defense' || el.stat.name === 'speed') {
            return pokemonObj[el.stat.name] = el.base_stat
        }
    })
    // armar el objeto de pokemon con toda la informacion necesaria
    return pokemonObj = {
        ...pokemonObj,
        id,
        name,
        image: res.data.sprites.front_default,
        weight,
        height,
        types: pokemonTypes,
    }
}

module.exports = {
    getAllPokemons: async () => {
        const allPokemons = []
        // obtener pokemons de la base de datos y guardarlos en el array
        let pokemonsDB = await Pokemon.findAll()
        if(pokemonsDB.length > 0) allPokemons.push(pokemonsDB[0])
        // obtener url dentro de cada pokemon
        let URL = 'https://pokeapi.co/api/v2/pokemon?limit=30'
        let getPokemons = await axios.get(URL)
        let pokemonsUrl = getPokemons.data.results.map(data => data.url)
        // array de promesas
        let requests = pokemonsUrl.map(url => axios.get(url))
        // llamado al array de promesas para obtener informacion de cada pokemon
        await axios.all(requests)
        .then(responses => {
            responses.forEach(res => {
                // crear objeto pokemon y guardarlo en array
                allPokemons.push(createPokemonObj(res))
            })
        })
        return allPokemons
    },
    getById: async (idPokemon) => {
        let getPokemon
        if(idPokemon.length > 4) {
            getPokemon = await Pokemon.findOne({ where: {id: idPokemon}})
        }
        if(!getPokemon) {
            getPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            .then(res => createPokemonObj(res)) 
        }
        return getPokemon
    }
}