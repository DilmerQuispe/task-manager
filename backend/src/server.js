//src/server.js

//importar la app
const app = require('./app');

//definir el puerto 
const PORT = 3000;

//levantamos el server 
app.listen(PORT, ()=>{
  console.log(`servidor corriendo en el puerto http://localhost:${PORT}`);
});

