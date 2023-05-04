// import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./actions"
import { GET_ALL } from "./actions"

const initState = {
    allPokemons: []
}

const rootReducer = (state = initState, { type, payload }) => {
    switch(type) {
        case GET_ALL:
            return {
                ...state,
                allPokemons: payload
            }  

        default:
            return {...state}
    }
}

export default rootReducer