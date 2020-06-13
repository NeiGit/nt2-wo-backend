import {Logger} from 'neilog'
import Error from '../services/errorBuilder.js'
import User from '../persistance-models/user-model.js'

const logger = new Logger()

function find(_id) {
    return User.findById(_id)
}

function listByName(query) {
    return User.find({name: { $regex: '.*' + query + '.*' }})
}

function listAll() {
    return User.find()
}

async function deleteById(_id) {
    try {
        const user = await find(_id)
        await user.remove()
    } catch (err) {
        throw Error(404, `Failed to delete user: ${_id}` + err)
    }
}

async function update(model) {
    try {
        const user = await find(model._id)
        const {name, password} = model

        user.name = name
        user.password = password

        await user.save()
        return user
    
    } catch (err) {
        logger.error(`Failed to update user: `, err)
        throw Error(400, `Failed to update user:  ${model._id}` + err)
    }
}

async function create(model) {
    try {
        const user = new User()
        const {name, password} = model

        user.name = name
        user.password = password

        await user.save()
        return user
    
    } catch (err) {
        logger.error(`Failed to create user ${model}: `, err)
        throw Error(400, `Failed to create user ${model}: ` + err)
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