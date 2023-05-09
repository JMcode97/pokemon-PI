import axios from 'axios'
export const GET_ALL = 'GET_ALL'
export const GET_TYPES = 'GET_TYPES'
export const CREATE = 'CREATE'
export const DATA_ORIGIN = 'DATA_ORIGIN'
export const DATA_TYPE = 'DATA_TYPE'
export const DATA_ORDER = 'DATA_ORDER'

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

export const filterByOrigin = (value) => {
    return {
        type: DATA_ORIGIN,
        payload: value
    }
}

export const filterByType = (value) => {
    return {
        type: DATA_TYPE,
        payload: value
    }
}

export const filterByOrder = (value) => {
    return {
        type: DATA_ORDER,
        payload: value
    }
}