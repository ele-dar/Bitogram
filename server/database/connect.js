import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
// Modelių importas
import { Users, Photos, Comments, Likes } from '../model/models.js'

const database = {}
const credentials = {
    database: 'bitogram',
    host: 'localhost',
    user: 'root',
    password: ''
}

try {
    // SQL prisijungimas
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })

    // SQL duomenų bazės sukūrimas
    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    // Sequelize prisijungimas prie duomenų bazės
    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { dialect: 'mysql' })

    // Modelių priskyrimas su sequelize
    database.Users = Users(sequelize)
    database.Photos = Photos(sequelize)
    database.Comments = Comments(sequelize)
    database.Likes = Likes(sequelize)

    //Reliacijų kūrimas:
    database.Users.hasMany(database.Photos)
    database.Photos.belongsTo(database.Users)

    database.Photos.hasMany(database.Comments)
    database.Comments.belongsTo(database.Photos)

    database.Users.hasMany(database.Comments)
    database.Comments.belongsTo(database.Users)

    database.Photos.hasMany(database.Likes)
    database.Likes.belongsTo(database.Photos)

    database.Users.hasMany(database.Likes)
    database.Likes.belongsTo(database.Users)

    // Sequelize duomenų bazės atnaujinimas
    await sequelize.sync({ alter: true })
} catch (e) {
    console.log(e)
    console.log('Nepavyko prisijungti prie duomenų bazės')
}

export default database