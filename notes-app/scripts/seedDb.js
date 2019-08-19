const { User, Folder, Note, UserFolder } = require('../models/index')


const seedDb = async () => {
    try {
        await User.destroy({
            where: {}
        })
        await Folder.destroy({
            where: {}
        })
        await Note.destroy({
            where: {}
        })
        await UserFolder.destroy({
            where: {}
        })
        const user1 = await User.create({
            name: 'Alexander Barbaran',
            email: 'abarbaran@fakemail.com',
            password: 'alex123'
        })

        const user2 = await User.create({
            name: 'Charles Beach',
            email: 'cbeach@fakemail.com',
            password: 'charles456'
        })
        const user3 = await User.create({
            name: 'Jhordan Figueroa',
            email: 'jfigueroa@fakemail.com',
            password: 'jordan789'
        })

        const user4 = await User.create({
            name: 'Phil Ma',
            email: 'pma@fakemail.com',
            password: 'phil012'
        })

        const folder1 = await Folder.create({
            title: 'Work',

        })

        const folder2 = await Folder.create({
            title: 'School'
        })

        const folder3 = await Folder.create({
            title: 'Health'
        })

        const folder4 = await Folder.create({
            title: 'Miscellaneous'
        })

        const note1 = await Note.create({
            title: 'help',
            content: 'help again'
        })
        
        await folder1.setUser(user1)
        await note1.setFolder(folder1)
        await folder2.setUser(user1)
        await folder3.setUser(user1)
        await folder4.setUser(user1)

    }
    catch(err) {
        console.log('error making seeds')
        throw err
    }
}

const run = async () => {
    try {
        await seedDb()
    }
    catch(err) {
        console.log('error running seeds')
        throw err
    }
    finally {
        await process.exit()
    }
}

run()