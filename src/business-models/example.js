import Joi from '@hapi/joi'

export class Example {
    constructor(dto) {
        validate(dto)
        if(dto._id) this._id = dto._id
        this.count = dto.count
    }
}

function validate(dto) {
    const schema = Joi.object({
        _id: Joi.string(),
        count: Joi.number().required(),
    });
    const { error } = schema.validate(dto)
    if (error) {
        throw error
    }
}