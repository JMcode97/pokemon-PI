import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { createPokemon, getTypes } from '../../redux/actions'
import formValidation from './formValidation'

const CreatePokemon = () => {
    const dispatch = useDispatch()
    const pokemonTypes = useSelector(state => state.pokemonTypes)
    
    const [data, setData] = useState({
        name: '',
        image: "/static/media/pokemonLogo.05b15868.png",
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
    })

    const initialFormState = {
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: []
    }

    const [errors, setErrors] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        types: '',
    })
    const [selectedTypes, setSelectedTypes] = useState([])

    const handleForm = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
        setErrors(formValidation({
            ...data, [e.target.name]: e.target.value
        }))
    }

    const handleChange = (e) => {
        if([...selectedTypes].length === 2) return setErrors({...errors, types: 'Solo puede seleccionar 2 tipos'})
        setErrors({...errors, types: ''})
        setSelectedTypes([...selectedTypes, e.target.value])
    }

    const removeTypes = (type) => {
        let dataArray = [...selectedTypes].filter(el => el !== type)
        setSelectedTypes(dataArray)
    }

    const handleSubmit = (e) => {
        e.preventDefault(e)
        setData({
            ...data, types: data.types.push(...selectedTypes)
        })
        dispatch(createPokemon(data))
        setData(initialFormState)
        setSelectedTypes([])
        alert('Formulario enviado con exito!')
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    return (
        <>
            <div
            className={styles.container} >
                <form 
                onSubmit={handleSubmit} >
                    <div>
                        <label>Nombre </label>
                        <input 
                        type="text"
                        name="name"
                        required
                        value={data.name}
                        onChange={handleForm} 
                        />
                    </div>
                        {
                            errors.name && <span className={styles.error} >{errors.name}</span>
                        }
                    <div>
                        <label>Vida </label>
                        <input 
                        type="number"
                        name="hp"
                        min={0}
                        required
                        value={data.hp}
                        onChange={handleForm} 
                        />
                    </div>
                        {
                            errors.hp && <span className={styles.error} >{errors.hp}</span>
                        }
                    <div>
                        <label>Ataque </label>
                        <input 
                        type="number"
                        name="attack"
                        min={0}
                        required
                        value={data.attack}
                        onChange={handleForm} 
                        />
                    </div>
                        {
                            errors.attack && <span className={styles.error} >{errors.attack}</span>
                        }
                    <div>
                        <label>Defensa </label>
                        <input 
                        type="number"
                        name="defense"
                        min={0}
                        required
                        value={data.defense}
                        onChange={handleForm} 
                        />
                    </div>
                        {
                            errors.defense && <span className={styles.error} >{errors.defense}</span>
                        }
                    <div>
                        <label>Velocidad </label>
                        <input 
                        type="number"
                        name="speed"
                        min={0}
                        value={data.speed}
                        onChange={handleForm} 
                        />
                    </div>
                    <div>
                        <label>Altura </label>
                        <input 
                        type="number"
                        name="height"
                        min={0}
                        value={data.height}
                        onChange={handleForm} 
                        />
                    </div>
                    <div>
                        <label>Peso </label>
                        <input 
                        type="number"
                        name="weight"
                        min={0}
                        value={data.weight}
                        onChange={handleForm} 
                        />
                    </div>
                    {
                        errors.types && <span className={styles.error} >{errors.types}</span>
                    }
                    <div
                    className={styles.types} >
                        {
                            selectedTypes?.map(type => {
                                return (
                                    <span
                                    key={type}
                                    style={{ backgroundColor: `var(--${type})` }} >
                                    {type}
                                    <button
                                    onClick={() => removeTypes(type)} >
                                    X
                                    </button>
                                    </span>
                                )
                            })
                        }
                    </div>
                    <select 
                    name="types" 
                    onChange={handleChange} >
                        <option>Tipos</option>
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
                    <button
                    className={styles.sendButton}
                    type="submit"
                    >
                    ENVIAR
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreatePokemon