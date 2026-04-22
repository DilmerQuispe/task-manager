const express = require('express');
const router = express.Router();

//importar controladores
const auth = require('../controllers/authController');
const task = require('../controllers/taskController');
const verificarToken = require('../middlewares/auth');

//Rutas de autenticacion
router.post('/register', auth.register);
router.post('/login', auth.login);

//Rutas protegidas
router.get('/tasks', verificarToken, task.getTasks);
router.post('/tasks', verificarToken, task.createTask);
router.put('/tasks/:id', verificarToken, task.updateTask);
router.delete('/tasks/:id', verificarToken, task.deleteTask);
router.put('/tasks/Logic/:id', verificarToken, task.deleteTaskLogic);

module.exports = router;