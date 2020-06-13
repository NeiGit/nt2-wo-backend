import Joi from '@hapi/joi'
import Error from '../services/errorBuilder.js'

export class Exercise {
    constructor(dto) {
        validateExercise(dto)
        if(dto._id) this._id = dto._id
        this.name = dto.name
        this.muscleGroups = dto.muscleGroups
    }
}

function validateExercise(dto) {
    const schema = Joi.object({
        _id: Joi.string(),
        name: Joi.string().required(),
        muscleGroups: Joi.array().required().min(1)
    });
    const { error } = schema.validate(dto)
    if (error) {
        throw error
    }
    validateMuscleGroups(dto.muscleGroups)
}

function validateMuscleGroups(mgDtos) {
    if (mgDtos.some(mg => typeof mg !== 'string'))
        throw Error(400, 'Invalid exercise muscle group')
}

