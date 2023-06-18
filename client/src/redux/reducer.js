import { CREATE, DATA_ORDER, DATA_ORIGIN, DATA_TYPE, GET_ALL, GET_TYPES } from "./actions"

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

        case DATA_ORIGIN: 
            const regexUUID = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
            if(payload === 'all') {
                return {
                    ...state,
                    filteredPokemons: state.allPokemons
                }
            }

            if(payload === 'db') {
                let originDB = state.filteredPokemons.filter(pokemon => regexUUID.test(pokemon.id))

                return {
                    ...state,
                    filteredPokemons: originDB
                }
            }

            if(payload === 'api') {
                let originDB = state.filteredPokemons.filter(pokemon => !regexUUID.test(pokemon.id))

                return {
                    ...state,
                    filteredPokemons: originDB
                }
            }

        case DATA_TYPE:
            let filteredPokemons 
            if(payload === 'all') {
                filteredPokemons = state.filteredPokemons
            }else {
                filteredPokemons = state.allPokemons.filter(pokemon => pokemon.types.includes(payload))
            }

            return {
                ...state,
                filteredPokemons: filteredPokemons
            }

        case DATA_ORDER:
            let orderedName = [...state.filteredPokemons]
            if(payload === 'asc'){
                orderedName.sort((a, b) => {
                    if(a.name < b.name) return -1
                    return 1
                })
            } 

            if(payload === 'dsc'){
                orderedName.sort((a, b) => {
                    if(a.name > b.name) return -1
                    return 1
                })
            }

            return {
                ...state,
                filteredPokemons: orderedName
            }

        default:
            return {...state}
    }
}

export default rootReducer