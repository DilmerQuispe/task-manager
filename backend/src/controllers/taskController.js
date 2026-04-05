const {where} = require('sequelize');
const {Task} = require('../models');

//obtener todas las tareas
exports.getTasks = async (req,res)=>{
    const tasks = await Task.findAll({
    where:{UserId:req.user.id} //solo tareas del usuario logueado
    });
    res.json(tasks);
};

//crear tareas
exports.createTask=async(req,res)=>{
    const task = await Task.create({
        title:req.body.title,
        description:req.body.description,
        UserId:req.user.id //asociamos tarea al usuario logueado
    });
    res.json(task);
};

//actualizar tareas
exports.updateTask=async(req,res)=>{
    const {id}=req.params;
    await Task.update(req.body,{
        where:{id}
    });
    res.json({mensaje:'Tarea  actualizada'});
};

//eliminar tareas
exports.deleteTask=async(req,res)=>{
    const {id}=req.params;
    await Task.destroy({
        where:{id}
    });
    res.json({mensaje:'Tarea eliminada'});
};