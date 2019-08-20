module.exports = (db, Sequelize) => {
    return db.define('note', {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING,
            allowNull:false
        }
    })
}
