const User = require('./Users');
const Task = require('./Task');

//un usuario puede tener muchas tareas
User.hasMany(Task);

//Una tarea pertenece a un usuario
Task.belongsTo(User);

module.exports = {User, Task};