const axios = require('axios')

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
            let { id } = req.params
            


        } catch (error) {
            
        }
    },
    getPokemonByName: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },
    createPokemon: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },
    getPokemonTypes: async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    },
}