const axios = require('axios')
const { Pokemon, Type } = require('../db')

// Funcion para crear un objeto de pokemon
const createPokemonObj = (res) => {
    let { id, name, weight, height } = res.data
    let pokemonObj = {}
    // Crear un array con los tipos del pokemon
    let pokemonTypes = res.data.types.map(data => data.type.name)
    // Insertar cada stat con su valor en el objeto de pokemon
    res.data.stats.map(el => {
        if(el.stat.name === 'hp' || el.stat.name === 'attack' || el.stat.name === 'defense' || el.stat.name === 'speed') {
            return pokemonObj[el.stat.name] = el.base_stat
        }
    })
    // Armar el objeto de pokemon con toda la informacion necesaria
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
// Funcion para crear un objeto de pokemon con informacion obtenida de Sequelize
const createPokemonObjDB = (res) => {
    let { hp, attack, defense, speed, id, name, image, weight, height, Types } = res[0].dataValues
    let pokemonObj = {}
    // Crear un array con los tipos del pokemon
    let pokemonTypes = Types.map(data => data.dataValues.name)
    // Armar el objeto con toda la informacion necesaria
    return pokemonObj = {
        hp,
        attack,
        defense,
        speed,
        id,
        name,
        image,
        weight,
        height,
        types: pokemonTypes,
    }
}

module.exports = {
    getAllPokemons: async (name) => {
        // Verificar si se recibe una query para buscar pokemon
        const allPokemons = []
        if(name) {
            // Busqueda de pokemon solicitado por query en la DB
            let pokemon
            await Pokemon.findOne({
                where: {name},
                include: {
                    model: Type,
                    attributes: ['name']
                }
            })
            .then(res => {
                if(res) pokemon = createPokemonObjDB([res])
            })
            // Si no existe en la DB se busca en la API
            if(!pokemon) {
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(res => pokemon = createPokemonObj(res))
            }
            return pokemon
        }
        // Obtener pokemons de la base de datos y guardarlos en el array
        await Pokemon.findAll({
            include: {
                    model: Type,
                    attributes: ['name']
                }
        })
        .then(responses => {
            return(
                responses.map(res => allPokemons.push(createPokemonObjDB([res])))
            )
        })
        // Obtener url dentro de cada pokemon
        let URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=60'
        let getPokemons = await axios.get(URL)
        let pokemonsUrl = getPokemons.data.results.map(data => data.url)
        // Array de promesas
        let requests = pokemonsUrl.map(url => axios.get(url))
        // Llamado al array de promesas para obtener informacion de cada pokemon
        await axios.all(requests)
        .then(responses => {
            responses.forEach(res => {
                // crear objeto pokemon y guardarlo en array
                allPokemons.push(createPokemonObj(res))
            })
        })

        // Funcion para obtener todos los pokemons por lotes

        // let current = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100'
        // while(current) {
        //     let getPokemons = await axios.get(current)
        //     let pokemonsUrl = getPokemons.data.results.map(data => data.url)
        //     // Array de promesas
        //     let requests = pokemonsUrl.map(url => axios.get(url))
        //     // Llamado al array de promesas para obtener informacion de cada pokemon
        //     await axios.all(requests)
        //     .then(responses => {
        //         responses.forEach(res => {
        //             // Crear objeto pokemon y guardarlo en array
        //             allPokemons.push(createPokemonObj(res))
        //         })
        //     })
        //     console.log(getPokemons.data.next)
        //     current = getPokemons.data.next
        // }
        
        return allPokemons
    },
    getById: async (idPokemon) => {
        // regEx pra verificar si el ID es de tipo UUIDv4
        let regexUUID = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
        // Si es UUIDv4 se hace la busqueda en la DB
        let getPokemon
        if(regexUUID.test(idPokemon)) {
            await Pokemon.findOne({
                where: {id: idPokemon},
                include: {
                    model: Type,
                    attributes: ['name']
                }
            })
            .then(res => getPokemon = createPokemonObjDB([res]))
        }
        // Si no es UUIDv4 se hace la busqueda en la API
        if(!getPokemon) {
            getPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            .then(res => createPokemonObj(res)) 
        }
        return getPokemon
    },
    createPokemon: async (name, image, hp, attack, defense, speed, height, weight, types) => {
        name = name.toLowerCase()
        // Busqueda de los tipos obtenidos por form para obtener su id
        let getTypes = await Type.findAll({
            where: {name: types},
        })
        getTypes = getTypes.map(el => el.id)
        // Creacion del pokemon en la DB
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
            },
        })
        // Si ya el pokemon existe en la DB, retorna un mensaje
        if(!created) {
          return 'Pokemon already exists...'  
        }
        // Se crea la relacion del pokemon creado y los tipos recibidos por form
        await pokemon.addTypes(getTypes)
        // Se busca el pokemon recien creado para crear objeto y retornarlo
        await Pokemon.findOne({
            where: {name},
            include: {
                model: Type,
                attributes: ['name']
            }
        })
        .then(res => pokemon = createPokemonObjDB([res]))


        return pokemon
    }
}