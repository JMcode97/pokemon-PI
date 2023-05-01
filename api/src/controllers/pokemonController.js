const axios = require('axios')
const { Pokemon, Type } = require('../db')

module.exports = {
    getPokemons: async (req, res) => {
        try {
            const allPokemons = []
            let URL = 'https://pokeapi.co/api/v2/pokemon?limit=12'
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
            let { name, image, hp, attack, defense, speed, height, weight, types } = req.body

            let getTypes = await Promise.all(types.map(type => Type.findOrCreate({
                where: {name: type},
                defaults: {name: type},
            })))
            getTypes = getTypes.map(el => el[0].id)

            let [pokemon, created] = await Pokemon.findOrCreate({
                where: { name },
                defaults: {
                    name,
                    image,
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    weight
                }
            })
            pokemon.addTypes(getTypes)

            if(!created) {
              return res.status(200).send('Pokemon already exists...')  
            }

            res.status(200).json(pokemon)

        } catch (err) {
            res.status(400).json({error: err.message})
        }
    },
    getPokemonTypes: async (req, res) => {
        try {
            const allTypes = []
            let URL = 'https://pokeapi.co/api/v2/type'
            await axios.get(URL)
            .then(res => {
                res.data.results.map(el => allTypes.push(el.name))
            })

            await Promise.all(allTypes.map(type => {
                Type.findOrCreate({
                    where: {name: type},
                    defaults: {
                        name: type
                    }
                })
            }))

            res.status(200).json(allTypes)
            
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    },
}