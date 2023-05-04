const { Router } = require('express')
const { getPokemonsHandler, getPokemonByIdHandler, createPokemonHandler } = require('../handlers/pokemonsHandler')

const pokemonsRouter = Router()

pokemonsRouter.get('/', getPokemonsHandler)
pokemonsRouter.get('/:idPokemon', getPokemonByIdHandler)
pokemonsRouter.post('/create', createPokemonHandler)


module.exports = pokemonsRouter