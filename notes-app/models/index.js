const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const NoteModel = require('./note');
const FolderModel = require('./folder');
const UserFolderModel = require('./user_folder');
const bcrypt = require('bcrypt');

const db = new Sequelize({
    database: 'notes_db',
    dialect: 'postgres'
});

const User = UserModel(db, Sequelize);
const Note = NoteModel(db, Sequelize);
const Folder = FolderModel(db, Sequelize);
const UserFolder = UserFolderModel(db, Sequelize);

User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(
        user.password,
        Number(process.env.SALT_ROUNDS)
    )

    user.password = hashedPassword
})

User.hasMany(Folder)
Folder.hasMany(Note)
Folder.belongsTo(User)
Note.belongsTo(Folder)

module.exports = {
    db,
    User,
    Note,
    Folder,
    UserFolder
}