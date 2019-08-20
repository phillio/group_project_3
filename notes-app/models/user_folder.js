module.exports = (db, Sequelize) => {
  return db.define('user_folder', {
      userId: Sequelize.INTEGER,
      folderId: Sequelize.INTEGER
  })
}