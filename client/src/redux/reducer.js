// import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./actions"
import { GET_ALL } from "./actions"

const initState = {
    allPokemons: []
    // myFavorites: [],
    // allCharacters: [], // Esta propiedad no tiene uso (Se puede utilizar para filtrar en principal)
}

const rootReducer = (state = initState, { type, payload }) => {
    switch(type) {
        case GET_ALL:
            return {
                ...state,
                allPokemons: payload
            }


        // case ADD_FAV:
        //     return {
        //         ...state,
        //         myFavorites: action.payload,
        //         // allCharacters: action.payload
        //     }

        // case REMOVE_FAV:
        //     return {
        //         ...state,
        //         myFavorites: action.payload
        //     }

        // case FILTER:
        //     if(action.payload === 'All') return {...state, myFavorites: state.allCharacters}
        //     return {
        //         ...state,
        //         myFavorites: [...state.allCharacters].filter((char) => char.gender === action.payload)
        //     }

        //     case ORDER:
        //     let allFavoritesOrder = [...state.myFavorites]
        //     if(action.payload === 'A'){
        //         allFavoritesOrder.sort((a, b) => {
        //             if(a.id < b.id) return -1
        //             return 1
        //         })
        //     } 

        //     if(action.payload === 'D'){
        //         allFavoritesOrder.sort((a, b) => {
        //             if(a.id > b.id) return -1
        //             return 1
        //         })
        //     } 

        //     return{
        //         ...state,
        //         myFavorites: allFavoritesOrder
        //     }    

        default:
            return {...state}
    }
}

export default rootReducer