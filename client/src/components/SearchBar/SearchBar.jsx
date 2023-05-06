import { useState } from "react"

const SearchBar = () => {
    const [value, setValue] = useState()

    const handleInputChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <>
            <div>
                <input type="text"
                placeholder="Ingresa un nombre o ID" 
                value={value}
                onChange={handleInputChange} />

                <button
                onClick={handleSubmit} >
                    Buscar
                </button>
            </div>
        </>
    )
}

export default SearchBar