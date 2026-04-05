const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

//Definir tabla de tareas
const Task = sequelize.define('Task',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    completed:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});
module.exports = Task;