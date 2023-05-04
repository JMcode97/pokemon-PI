const { getAllTypes } = require("../controllers/typesController")

module.exports = {
    getTypesHandler: async (req, res) => {
        try {
            let types = await getAllTypes()
            res.status(200).json(types)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
}