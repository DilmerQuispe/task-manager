const bcrypt = require('bcrypt');
const {User} = require('../models');
const generarToken = require('../utils/jwt');

//Registro
exports.register = async (req,res)=>{
    try{
        const{name,email,password}=req.body;
        //encriptamos constraseña
        const hash = await bcrypt.hash(password,10);
        //crear usuario
        const user = await User.create({
            name,
            email,
            password:hash,
        });
        res.json(user);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
//Login 
exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({where:(email)});

        if(!user){
            return res.status(404).json({error:'Usuario no encontrado'});
        }
        //validamos constraeña
        const valid = await bcrypt.compare(password,user.password);
        if(!valid){
            return res.status(401).json({error:'Contraseña incorrecta'});
        }

        //generar token
        const token = generarToken(user);
        res.json({token});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};