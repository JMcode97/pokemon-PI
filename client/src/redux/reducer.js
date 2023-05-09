import { CREATE, FILTER, GET_ALL, GET_TYPES } from "./actions"

const initState = {
    allPokemons: [],
    filteredPokemons: [],
    pokemonTypes: []
}

const rootReducer = (state = initState, { type, payload }) => {
    switch(type) {
        case GET_ALL:
            return {
                ...state,
                allPokemons: payload,
                filteredPokemons: payload
            }

        case GET_TYPES:
            return {
                ...state,
                pokemonTypes: payload
            }

        case CREATE:
            let dataArray = [...state.allPokemons]
            dataArray.unshift(payload)
            return {
                ...state,
                allPokemons: dataArray,
                filteredPokemons: dataArray
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