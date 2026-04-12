//importamos React Router
import { BrowserRouter, Routes,Route } from "react-router-dom";

//Importamos nuestras paginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"

function App(){
return (
    <BrowserRouter>
        <Routes>
            {/*Ruta de Login*/}
            <Route path="/" element={<Login/>}/>
            {/*Rutas dashboard*/}
            <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
        </BrowserRouter>
      //<h1>Hola este es un Task Manager</h1>
      //          
    );
}

export default App;