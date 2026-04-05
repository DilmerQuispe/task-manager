const jwt = require('jsonwebtoken');

//Midleware para proteger rutas
const verificarToken = (req,res,next)=>{
    //obtener los tokens del header
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json(
            {mensaje:'Accesos denegado'})
    }

    try{
        //Verificar token
        const decoded=jwt.verify(token,"secreto");
        //guaradamos info del usuario
        req.user=decoded;
        next();
    }catch(error){
        return res.status(400).json(
            {mensaje:'Token invalido'})
    }
};
module.exports = verificarToken;