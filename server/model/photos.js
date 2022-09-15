import { DataTypes } from 'sequelize'

const Photos = (sequelize) => {
    const Schema = {
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        caption: {
            type: DataTypes.STRING,
        }
    }

    return sequelize.define('photos', Schema)
}

export default Photos