const formValidation = (data) => {
    let errors = {}
    if(data.name.length > 10) {
        errors.name = 'El nombre no puede ser mayor a 10 caracteres'
    }

    if(data.name === '') {
        errors.name = 'El nombre no puede estar vacio'
    }

    if(data.image === '') {
        errors.image = 'La imagen no puede estar vacia'
    }

    if(data.hp === '') {
        errors.hp = 'El stat HP no puede estar vacio'
    }

    if(data.attack === '') {
        errors.attack = 'El stat ATTACK no puede estar vacio'
    }

    if(data.defense === '') {
        errors.defense = 'El stat DEFENSE no puede estar vacio'
    }

    return errors
}

export default formValidation