import axios from 'axios'
export const GET_ALL = 'GET_ALL'
export const FILTER = 'FILTER'

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

// export const filterCards = (gender) => {
//     return {
//         type: FILTER,
//         payload: gender
//     }
// }