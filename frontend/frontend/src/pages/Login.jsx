//para manejar estados
import { useState } from "react";

//libreria para hacer peticiones http
import axios from "axios";

//hook para redireccionar
import { useNavigate } from "react-router-dom";

function Login(){
    //Guarda estados
    const[email,setEmail]=useState("");
    const[password, setPassword]=useState("");

    //Para redireccionar a otra pagina
    const navigate = useNavigate();

    const login = async()=>{
        try{
            const res = await axios.post("http://localhost:3000/api/login",
                {
                    email, password
                });

                //Guardar el tokenstorage
                localStorage.setItem("token",res.data.Token);
                //redireccionamos al dashboard
                navigate("/dashboard")
        }catch(erorr){
            console.error("Error en el login",error);
            alert("Credenciales incorrectas");
        }
    };

    return(
        <div>
            <h2>Login</h2>
            <input 
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            type="email"/>
            <input 
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password"  
            type="password"/>

            <button onClick={login}>Ingresar</button>
        </div>
    );
}

export default Login;