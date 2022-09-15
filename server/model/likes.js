import { DataTypes } from 'sequelize'

const Likes = (sequelize) => {
    const Schema = {}

    return sequelize.define('likes', Schema)
}

export default Likes