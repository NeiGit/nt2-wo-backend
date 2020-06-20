import Joi from '@hapi/joi'
import { Set } from './set.js'

export class Workout {
    constructor(dto) {
        validate(dto)
        if(dto._id) this._id = dto._id
        this.title = dto.title
        this.rounds = dto.rounds
        this.sets = buildSets(dto.sets)
        this.user_id = dto.user_id
    }
}

function validate(dto) {
    const schema = Joi.object({
        _id: Joi.string(),
        user_id: Joi.string().required(),
        title: Joi.string().required(),
        rounds: Joi.number().positive().required(),
        sets: Joi.array().required().min(1)
    });
    const { error } = schema.validate(dto)
    if (error) {
        throw error
    }
}

function buildSets(setsDtos) {
    return setsDtos.map(dto => new Set(dto))
}