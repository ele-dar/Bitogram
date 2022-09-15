import Joi from 'joi'

const validate = (schema, req, res, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true,
    }
    const { error, value } = schema.validate(req.body, options)
    let message = ''
    if (error) {
        switch (error.details[0].path[0]) {
            case 'username':
                message = 'Vartotojo vardas turi būti 2-50 simbolių ilgio'
                break
            case 'email':
                message = 'Netinkamas el.pašto adresas'
                break
            case 'password':
                message = 'Slaptažodis turi būti 4-12 simbolių ilgio'
                break
            case 'photo':
                message = 'Būtina įkelti nuotrauką'
                break
            case 'comment':
                message = 'Komentaras turi būti 5-255 simbolių ilgio'
                break
            default:
                message = 'Netinkamai užpildyti laukeliai'
        }
        console.log(error.details[0].path[0])
        return res.status(400).send(message)
    }

    req.body = value
    next()
}

export const userValidator = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(12).required(),
        photo: Joi.string().allow(''),
        about: Joi.string().allow('')
    })
    validate(schema, req, res, next)
}

export const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
    validate(schema, req, res, next)
}

export const photoValidator = (req, res, next) => {
    const schema = Joi.object({
        photo: Joi.string(),
        caption: Joi.string().allow('')

    })
    validate(schema, req, res, next)
}

export const commentValidator = (req, res, next) => {
    const schema = Joi.object({
        comment: Joi.string().min(5).max(255).required(),
    })
    validate(schema, req, res, next)
}

export default validate