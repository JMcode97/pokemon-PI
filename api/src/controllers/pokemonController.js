const axios = require('axios')
const { Pokemon } = require('../db')

module.exports = {
    getPokemons: async (req, res) => {
        try {
            const allPokemons = []
            let URL = 'https://pokeapi.co/api/v2/pokemon?limit=10'
            let getPokemons = await axios.get(URL)
            let pokemonsUrl = getPokemons.data.results.map(data => data.url)
            let requests = pokemonsUrl.map(url => axios.get(url))

            await axios.all(requests)
            .then(responses => {
                responses.forEach(res => {
                    let { id, name } = res.data
                    let pokemonTypes = res.data.types.map(data => data.type.name)

                    allPokemons.push({
                        id,
                        name,
                        image: res.data.sprites.front_default,
                        types: pokemonTypes
                    })
                })
            })

            res.status(200).json(allPokemons)
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    },
    getPokemonById: async (req, res) => {
        try {
            let { idPokemon } = req.params
            let getPokemon
            if(idPokemon.length > 4) {
                getPokemon = await Pokemon.findOne({ where: {id: idPokemon}})
            }
            if(!getPokemon) {
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
                .then(res => {
                    let { id, name } = res.data
                    let pokemonTypes = res.data.types.map(data => data.type.name)
                    getPokemon = {
                        id,
                        name,
                        image: res.data.sprites.front_default,
                        types: pokemonTypes
                    }
                })
            }
            res.status(200).json(getPokemon)

        } catch (err) {
            res.status(400).json({error: err.message})
        }
    },
    getPokemonByName: async (req, res) => {
        try {
            let { pokemonName } = req.query
            pokemonName = pokemonName.toLowerCase()
            let getPokemon
            getPokemon = await Pokemon.findOne({ where: {name: pokemonName}})
            if(!getPokemon) {
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(res => {
                    let { id, name } = res.data
                    let pokemonTypes = res.data.types.map(data => data.type.name)
                    getPokemon = {
                        id,
                        name,
                        image: res.data.sprites.front_default,
                        types: pokemonTypes
                    }
                })
            }
            res.status(200).json(getPokemon)

        } catch (err) {
            res.status(400).json({error: err.message})
        }
    },
    createPokemon: async (req, res) => {
        try {
            let { name, image, hp, attack, defense, speed, height, weight } = req.body

            
        } catch (error) {
            
        }
    },
    getPokemonTypes: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },
}