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
        <div className="min-h-sreen flex items-center justify bg-greadient-to-br
        from-blue-500 to-indig0-600">
            {/*CARD*/}
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-blod text-center mb-6 text-gray-800">
                    Iniciar Sesion
                </h1>
                {/*error*/}
                {error &&(
                    <p className="text-red-500 text-center mb-4">
                        {error}
                    </p>
                )}

                <div className="space-y-4">
                <input 
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus-ring-2 focus-ring-blue-400"
                    type="email"/>
                    <input 
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Password" 
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus-ring-2 focus-ring-blue-400"
                    type="password"/>
                </div>

                <button onClick={login}
                className="w-full mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                    Ingresar
                </button>
            </div>
        </div>
    );
}

export default Login;