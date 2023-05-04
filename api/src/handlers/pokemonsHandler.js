const { getAllPokemons, getById, createPokemon } = require("../controllers/pokemonsController")

module.exports = {
    getPokemonsHandler: async (req, res) => {
        try {
            let { name } = req.query
            let pokemons = await getAllPokemons(name)
            res.status(200).json(pokemons)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    },
    getPokemonByIdHandler: async (req, res) => {
        try {
            let { idPokemon } = req.params
            let pokemon = await getById(idPokemon)
            res.status(200).json(pokemon)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    },
    createPokemonHandler: async (req, res) => {
        try {
            let { name, image, hp, attack, defense, speed, height, weight, types } = req.body
            let pokemon = await createPokemon(name, image, hp, attack, defense, speed, height, weight, types)
            res.status(200).json(pokemon)
        } catch (error) {
            res.status(200).json({error: error.message})
        }
    }
}