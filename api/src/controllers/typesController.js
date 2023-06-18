const axios = require('axios')
const { Type } = require('../db')

module.exports = {
    getAllTypes: async () => {
        // Obtener todos los tipos de pokemons de la API
        const allTypes = []
        // Obtener todos los tipos de pokemons de la DB y retornarlos
        let typesDB = await Type.findAll()
        if(!typesDB.length) {
            let URL = 'https://pokeapi.co/api/v2/type'
            await axios.get(URL)
            .then(res => {
                res.data.results.map(el => allTypes.push(el.name))
            })
            // Guardar cada tipo de pokemon en la DB
            await Promise.all(allTypes.map(type => {
                Type.findOrCreate({
                    where: {name: type},
                    defaults: {
                        name: type
                    }
                })
            }))

            typesDB = await Type.findAll()
        }

        return typesDB
    }
}