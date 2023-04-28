const { Router } = require('express');
const { getPokemons, getPokemonById, getPokemonByName } = require('../controllers/pokemonController');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons)
router.get('/pokemons/name?', getPokemonByName)
router.get('/pokemons/:idPokemon', getPokemonById)


module.exports = router;
