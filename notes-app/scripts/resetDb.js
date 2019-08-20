const { db } = require('../models/index.js')

const resetDb = async () => {
    try {
        await db.sync({ force: true })
    } catch (error) {
        throw error
    }
    finally {
        process.exit()
    }
}

resetDb()