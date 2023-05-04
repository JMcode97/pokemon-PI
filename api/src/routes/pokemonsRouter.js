const { Router } = require('express')
const { getPokemonsHandler, getPokemonByIdHandler } = require('../handlers/pokemonsHandler')

const pokemonsRouter = Router()

pokemonsRouter.get('/', getPokemonsHandler)
pokemonsRouter.get('/:idPokemon', getPokemonByIdHandler)


module.exports = pokemonsRouter