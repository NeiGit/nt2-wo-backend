import Joi from '@hapi/joi'

export class User {
    constructor(dto) {
        // validate(dto)
        if (dto._id) this._id = dto._id
        this.name = dto.name
        this.role = dto.role
    }
}

function validate(dto) {
    const schema = Joi.object({
        _id: Joi.string(),
        name: Joi.string()
    });
    const { error } = schema.validate(dto)
    if (error) {
        throw error
    }
}