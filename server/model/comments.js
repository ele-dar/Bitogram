import { DataTypes } from 'sequelize'

const Comments = (sequelize) => {
    const Schema = {
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }

    return sequelize.define('comments', Schema)
}

export default Comments