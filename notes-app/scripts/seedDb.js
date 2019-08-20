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

        const folder5 = await Folder.create({
            title: 'Work',
        })

        const folder6 = await Folder.create({
            title: 'School'
        })

        const folder7 = await Folder.create({
            title: 'Health'
        })

        const folder8 = await Folder.create({
            title: 'Miscellaneous'
        })

        const note1 = await Note.create({
            title: 'help',
            content: 'help again'
        })

        const note2 = await Note.create({
            title: 'this not good',
            content: 'really not good'
        })

        const note3 = await Note.create({
            title: 'already',
            content: 'are we already there'
        })

        const note4 = await Note.create({
            title: 'finish',
            content: 'can we finish'
        })

        const note5 = await Note.create({
            title: 'help',
            content: 'help again'
        })

        const note6 = await Note.create({
            title: 'this not good',
            content: 'really not good'
        })

        const note7 = await Note.create({
            title: 'already',
            content: 'are we already there'
        })

        const note8 = await Note.create({
            title: 'finish',
            content: 'can we finish'
        })
        
        await folder1.setUser(user1)
        await folder2.setUser(user1)
        await folder3.setUser(user1)
        await folder4.setUser(user1)
        await folder5.setUser(user2)
        await folder6.setUser(user2)
        await folder7.setUser(user2)
        await folder8.setUser(user2)

        await note1.setFolder(folder1)
        await note2.setFolder(folder1)
        await note3.setFolder(folder1)
        await note4.setFolder(folder1)
        await note5.setFolder(folder5)
        await note6.setFolder(folder5)
        await note7.setFolder(folder5)
        await note8.setFolder(folder5)

        await note1.setUser(user1)
        await note2.setUser(user1)
        await note3.setUser(user1)
        await note4.setUser(user1)
        await note5.setUser(user2)
        await note6.setUser(user2)
        await note7.setUser(user2)
        await note8.setUser(user2)
        
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