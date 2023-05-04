const axios = require('axios')
const { Type } = require('../db')

module.exports = {
    getAllTypes: async () => {
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
        const typesDB = await Type.findAll()

        return typesDB
    }
}