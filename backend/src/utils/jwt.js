const jwt = require('jsonwebtoken');

//
const generarToken = (user)=>{
    return jwt.sign(
        {
            id:user.id, //payload(Datos dentro del token)
        },
        "secreto", //clave secreta
        {
            expiresIn: '1h' //Duracion de teimpo del token
        }
    )
}
module.exports = generarToken;