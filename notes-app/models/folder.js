module.exports = (db, Sequelize) => {
    return db.define('folder', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}

