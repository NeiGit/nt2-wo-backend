import Joi from '@hapi/joi'

export class Set {
    constructor(dto) {
        validate(dto)
        this.reps = dto.reps
        this.time = dto.time
        this.exercise_id = dto.exercise_id
    }
}

function validate(dto) {
    const schema = Joi.object({
        reps: Joi.number(),
        time: Joi.number(),
        exercise_id: Joi.string().required(),
    });
    const { error } = schema.validate(dto)
    if (error) {
        throw error
    }
}