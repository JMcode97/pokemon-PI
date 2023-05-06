import { FILTER, GET_ALL } from "./actions"

const initState = {
    allPokemons: [],
    filteredPokemons: [],
}

const rootReducer = (state = initState, { type, payload }) => {
    switch(type) {
        case GET_ALL:
            return {
                ...state,
                allPokemons: payload,
                filteredPokemons: payload
            }

        case FILTER: {
            // origin: saber si se va a filtrar de (todos, api, db)
            // filter: filtrar por tipo
            return

        }    

        default:
            return {...state}
    }
}

export default rootReducer