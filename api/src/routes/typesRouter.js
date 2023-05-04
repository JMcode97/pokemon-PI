const { Router } = require('express')
const { getTypesHandler } = require('../handlers/typesHandler')
const typesRouter = Router()

typesRouter.get('/', getTypesHandler)

module.exports = typesRouter