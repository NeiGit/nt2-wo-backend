import {Logger} from 'neilog'
import Error from '../services/errorBuilder.js'
import Workout from '../persistance-models/workout-model.js'

const logger = new Logger()

function find(_id) {
    return Workout.findById(_id)
}

function listByName(query) {
    return Workout.find({name: { $regex: '.*' + query + '.*' }})
}

function listAll() {
    return Workout.find()
}

async function deleteById(_id) {
    try {
        const workout = await find(_id)
        await workout.remove()
    } catch (err) {
        throw Error(404, `Failed to delete workout: ${_id}` + err)
    }
}

async function update(model) {
    try {
        const workout = await find(model._id)
        const {title, rounds, sets} = workout

        workout.title = title
        workout.rounds = rounds
        workout.sets = sets || []


        await workout.save()
        return workout
    
    } catch (err) {
        logger.error(`Failed to update workout: `, err)
        throw Error(400, `Failed to update workout:  ${model._id}` + err)
    }
}

async function create(model) {
    try {
        const workout = new Workout()
        const {title, rounds, sets} = model

        workout.title = title
        workout.rounds = rounds
        workout.sets = sets || []
        
        await workout.save()
        return workout
    } catch (err) {
        logger.error(`Failed to create workout ${model}: `, err)
        throw Error(400, `Failed to create workout ${model}: ` + err)
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