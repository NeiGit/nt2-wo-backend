import {Logger} from 'neilog'
import Error from '../services/errorBuilder.js'
import UserDB from '../persistance-models/user-model.js'
import {User} from '../business-models/user.js'

const logger = new Logger()

function find(_id) {
    return UserDB.findById(_id)
}

function listByName(query) {
    return UserDB.find({name: { $regex: '.*' + query + '.*' }})
}

function listAll() {
    return UserDB.find()
}

async function login(userDTO) {
    const { name, password } = userDTO
    const user = await UserDB.findOne({ name, password })
    if (user) return new User(user)
    else throw Error(404, "User not found")
}

async function signup(userDTO) {
    const { name, password } = userDTO
    const existing = await UserDB.findOne({ name })
    if (existing) throw Error(400, `Username ${name} already taken.`)
    else {
        return await create(userDTO)
    }
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
        const {name, password} = userDTO

        user.name = name
        user.password = password

        await user.save()
        return user
    
    } catch (err) {
        logger.error(`Failed to update user: `, err)
        throw Error(400, `Failed to update user:  ${model._id}` + err)
    }
}

async function create(userDTO) {
    try {
        const user = new UserDB()
        const {name, password} = userDTO

        user.name = name
        user.password = password

        await user.save()
        return new User(user)
    
    } catch (err) {
        logger.error(`Failed to create user ${userDTO}: `, err)
        throw Error(400, `Failed to create user ${userDTO}: ` + err)
    }
}



export default {
    find,
    listByName,
    listAll,
    create,
    deleteById,
    update,
    login,
    signup
}