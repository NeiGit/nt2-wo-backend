const currentEnv = process.env.ENV || 'dev'

const envs = {
    prod: {
        dbURI: process.env.ATLAS_URI_PROD
        
    },
    dev: {
        dbURI: process.env.ATLAS_URI_TEST
    }
}

const config = {
    dbURI: envs[currentEnv].dbURI,
}

export default {config, currentEnv}