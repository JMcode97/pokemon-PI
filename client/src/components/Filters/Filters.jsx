import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { useEffect } from 'react'
import { filterByOrder, filterByOrigin, getTypes } from '../../redux/actions'

const Filters = () => {
    const dispatch = useDispatch()
    const pokemonTypes = useSelector(state => state.pokemonTypes)
    const handleOriginFilter = (e) => {
        if(e.target.value !== 'Origen') {
            dispatch(filterByOrigin(e.target.value))
        }
    }
    const handleTypeFilter = (e) => {
        if(e.target.value !== 'Tipo') {
            dispatch(filterByOrigin(e.target.value))
        }
    }
    const handleOrderFilter = (e) => {
        if(e.target.value !== 'Orden') {
            dispatch(filterByOrder(e.target.value))
        }
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    return (
        <>
            <div
            className={styles.container} >
                <select
                onChange={handleOriginFilter} >
                    <option>Origen</option>
                    <option value="all">todos</option>
                    <option value="db">base de datos</option>
                    <option value="api">API</option>
                </select>

                <select
                onChange={handleTypeFilter} >
                    <option>Tipo</option>
                    <option value="all">todos</option>
                    {
                        pokemonTypes?.map(type => {
                            return (
                                <option
                                key={type.id} 
                                value={type.name} >
                                {type.name}
                                </option>
                            )
                        })
                    }
                </select>

                <select
                onChange={handleOrderFilter} >
                    <option>Orden</option>
                    <option value="asc">ascendente</option>
                    <option value="dsc">descendente</option>
                </select>
            </div>
        </>
    )
}

export default Filters