import { DataTypes } from 'sequelize'

const Users = (sequelize) => {
    const Schema = {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
        },
        about: {
            type: DataTypes.STRING,
        }
    }

    return sequelize.define('users', Schema)
}

export default Users