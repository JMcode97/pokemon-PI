import { useState } from "react"
import { useHistory } from "react-router-dom"
import styles from './styles.module.css'

const SearchBar = () => {
    const history = useHistory()
    const [value, setValue] = useState()

    const handleInputChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/details/${value.toLowerCase()}`)
        setValue('')
    }

    return(
        <>
            <div
            className={styles.container} >
                <input type="text"
                placeholder="Ingresa un nombre o ID" 
                value={value}
                onChange={handleInputChange} />

                <button
                onClick={handleSubmit} >
                    BUSCAR
                </button>
            </div>
        </>
    )
}

export default SearchBar