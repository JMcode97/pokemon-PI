import axios from 'axios'
export const GET_ALL = 'GET_ALL'
export const FILTER = 'FILTER'
export const GET_TYPES = 'GET_TYPES'
export const CREATE = 'CREATE'

export const getPokemons = () => {
    let endpoint = 'http://localhost:3001/pokemons'
    return async (dispatch) => {
        try {
            await axios.get(endpoint)
            .then(({ data }) => {
                return dispatch({
                    type: GET_ALL,
                    payload: data
                })
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const getTypes = () => {
    let endpoint = 'http://localhost:3001/types/'
    return async (dispatch) => {
        try {
            await axios.get(endpoint)
            .then(({ data }) => {
                return dispatch({
                    type: GET_TYPES,
                    payload: data
                })
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const createPokemon = (form) => {
    let endpoint = 'http://localhost:3001/pokemons/create/'
    return async (dispatch) => {
        try {
            await axios.post(endpoint, form)
            .then(({ data }) => {
                return dispatch({
                    type: CREATE,
                    payload: data
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// export const filterCards = (gender) => {
//     return {
//         type: FILTER,
//         payload: gender
//     }
// }