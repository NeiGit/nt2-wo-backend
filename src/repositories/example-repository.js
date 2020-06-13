import {Logger} from 'neilog'
import Error from '../services/errorBuilder.js'
import Example from '../persistance-models/example-model.js'

const logger = new Logger()

function find(_id) {
    return Example.findById(_id)
}

function findGreaterOrEqualsThan(_floor) {
    return Example.find({count: { $gte: _floor }})
}

function listByName(query) {
    return Example.find({name: { $regex: '.*' + query + '.*' }})
}

function listAll() {
    return Example.find()
}

async function deleteById(_id) {
    try {
        const example = await find(_id)
        await example.remove()
    } catch (err) {
        throw Error(404, `Failed to delete example: ${_id}` + err)
    }
}

async function update(model) {
    try {
        const example = await find(model._id)
        const {count} = model

        example.count = count

        await example.save()
        return example
    
    } catch (err) {
        logger.error(`Failed to update example: `, err)
        throw Error(400, `Failed to update example:  ${model._id}` + err)
    }
}

async function create(model) {
    try {
        const example = new Example()
        const {count} = model
        example.count = count
        await example.save()
        return example
    } catch (err) {
        logger.error(`Failed to create example ${model}: `, err)
        throw Error(400, `Failed to create example ${model}: ` + err)
    }
}



export default {
    find,
    listByName,
    listAll,
    create,
    deleteById,
    update,
    findGreaterOrEqualsThan,
}