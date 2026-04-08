//Conexion a base de datos
//Importamos sequelize
const {Sequelize} = require('sequelize');

//Crear conexion a mysql
const sequelize = new Sequelize('taskmanager','root','',
    {
        host: 'localhost',
        dialect: 'mysql'
    });

//probar la conexion
sequelize.authenticate()
.then(()=>console.log('Conexion Exitosa a la base de datos'))
.catch(err => console.error('Error de conexion a la base de datos:',err));

//xportar la conexion
module.exports = sequelize;