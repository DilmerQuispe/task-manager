const jwt = require(jsonwebtoken);

//
const generarToken = (user)=>{
    return jwt.sing(
        {
            id:user.id, //payload(Datos dentro del token)
        },
        "secreto", //clave secreta
        {
            experseIn: '1h' //Duracion de teimpo del token
        }
    )
}
module.exports = generarToken;