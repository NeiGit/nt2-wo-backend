import {Logger} from 'neilog'
import Error from '../services/errorBuilder.js'
import Exercise from '../persistance-models/exercise-model.js'

const logger = new Logger()

function find(_id) {
    return Exercise.findById(_id)
}

function listByName(query) {
    return Exercise.find({name: { $regex: '.*' + query + '.*' }})
}

function listAll() {
    return Exercise.find()
}

async function deleteById(_id) {
    try {
        const exercise = await find(_id)
        await exercise.remove()
    } catch (err) {
        throw Error(404, `Failed to delete exercise: ${_id}` + err)
    }
}

async function update(model) {
    try {
        const exercise = await find(model._id)
        const {name} = model
        exercise.name = name
        exercise.muscleGroups = model.muscleGroups || []
        await exercise.save()
        return exercise
    
    } catch (err) {
        logger.error(`Failed to update exercise: `, err)
        throw Error(400, `Failed to update exercise:  ${model._id}` + err)
    }
}

async function create(model) {
    try {
        const exercise = new Exercise(model)
        const {name} = model
        exercise.name = name
        exercise.muscleGroups = model.muscleGroups || []
        await exercise.save()
        return exercise
    } catch (err) {
        logger.error(`Failed to create exercise ${model}: `, err)
        throw Error(400, `Failed to create exercise ${model}: ` + err)
    }
}



export default {
    find,
    listByName,
    listAll,
    create,
    deleteById,
    update
}