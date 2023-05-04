const { getAllPokemons, getById } = require("../controllers/pokemonsController")

module.exports = {
    getPokemonsHandler: async (req, res) => {
        try {
            let pokemons = await getAllPokemons()
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
}