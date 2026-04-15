const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

//Registro de usuarios
exports.register = async (req,res)=>{
    try{
        const{username,email,password}=req.body;
        //encriptamos constraseña
        const hashPassword = await bcrypt.hash(password,10);
        //crear usuario
        const user = await User.create({
            username,
            email,
            password:hashPassword,
        });
        res.json({message:"Usuario creado correctamente"});
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Error al registrar"},error.message);
    }
};
//Login 
exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({where:{email}});

        if(!user){
            return res.status(404).json({error:'Usuario no encontrado'});
        }
        //validamos constraeña
        const valid = await bcrypt.compare(password,user.password);
        if(!valid){
            return res.status(401).json({error:'Contraseña incorrecta'});
        }

        //generar token
        const token = jwt.sign(
            {id:user.id},
            "secreto",
            {expiresIn:'1h'}
        );
        res.json({token});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};