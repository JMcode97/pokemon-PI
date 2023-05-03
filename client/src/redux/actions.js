import axios from 'axios'
// export const ADD_FAV = 'ADD_FAV'
// export const REMOVE_FAV = 'REMOVE_FAV'
// export const FILTER = 'FILTER'
// export const ORDER = 'ORDER'
export const GET_ALL = 'GET_ALL'

export const getPokemons = () => {
    const endpoint = 'http://localhost:3001/pokemons'
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



// export const addFav = (character) => {
//     const endpoint = 'http://localhost:3001/rickandmorty/fav';
//     return async (dispatch) => {
//         try {
//             await axios.post(endpoint, character)
//             .then(({ data }) => {
//                 return dispatch({
//                     type: 'ADD_FAV',
//                     payload: data,
//                 });
//             });

//         } catch (error) {
//             console.log(error)
//         }
//     };
// };

// export const removeFav = (id) => {
//     const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
//     return async (dispatch) => {
//         try {
//             await axios.delete(endpoint)
//             .then(({ data }) => {
//                 return dispatch({
//                     type: 'REMOVE_FAV',
//                     payload: data,
//                 });
//             });

//         } catch (error) {
//             console.log(error)
//         }
//     };
// };

// export const filterCards = (gender) => {
//     return {
//         type: FILTER,
//         payload: gender
//     }
// }

// export const orderCards = (order) => {
//     return {
//         type: ORDER,
//         payload: order
//     }
// }