const axios = require('axios')
const { Pokemon, Type } = require('../db')

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
// armar el objeto de pokemon con informacion obtenida con Sequelize
const createPokemonObjDB = (res) => {
    let { hp, attack, defense, speed, id, name, image, weight, height, Types } = res[0].dataValues
    let pokemonObj = {}
    let pokemonTypes = Types.map(data => data.dataValues.name)
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
        const allPokemons = []
        if(name) {
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
            if(!pokemon) {
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(res => pokemon = createPokemonObj(res))
            }
            return pokemon
        }
        // obtener pokemons de la base de datos y guardarlos en el array
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
        // obtener url dentro de cada pokemon
        
        let URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=60'
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

        // let current = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100'
        // while(current) {
        //     let getPokemons = await axios.get(current)
        //     let pokemonsUrl = getPokemons.data.results.map(data => data.url)
        //     // array de promesas
        //     let requests = pokemonsUrl.map(url => axios.get(url))
        //     // llamado al array de promesas para obtener informacion de cada pokemon
        //     await axios.all(requests)
        //     .then(responses => {
        //         responses.forEach(res => {
        //             // crear objeto pokemon y guardarlo en array
        //             allPokemons.push(createPokemonObj(res))
        //         })
        //     })
        //     console.log(getPokemons.data.next)
        //     current = getPokemons.data.next
        // }
        
        return allPokemons
    },
    getById: async (idPokemon) => {
        let getPokemon
        if(idPokemon.length > 4) {
            await Pokemon.findOne({
                where: {id: idPokemon},
                include: {
                    model: Type,
                    attributes: ['name']
                }
            })
            .then(res => getPokemon = createPokemonObjDB([res]))
        }
        if(!getPokemon) {
            getPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            .then(res => createPokemonObj(res)) 
        }
        return getPokemon
    },
    createPokemon: async (name, image, hp, attack, defense, speed, height, weight, types) => {
        name = name.toLowerCase()
        let getTypes = await Type.findAll({
            where: {name: types},
        })
        getTypes = getTypes.map(el => el.id)

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
        if(!created) {
          return 'Pokemon already exists...'  
        }
        await pokemon.addTypes(getTypes)
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