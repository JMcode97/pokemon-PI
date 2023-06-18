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

    if(data.hp <= 0) {
        errors.hp = 'El stat HP no puede ser menor a 0'
    }

    if(data.attack <= 0) {
        errors.attack = 'El stat ATTACK no puede ser menor a 0'
    }

    if(data.defense <= 0) {
        errors.defense = 'El stat DEFENSE no puede ser menor a 0'
    }

    return errors
}

export default formValidation