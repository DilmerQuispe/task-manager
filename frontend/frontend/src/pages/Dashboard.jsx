import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard(){
    //Estado de la lista de tareas
    const{task,setTasks}=useState([]);

    //estado para la nueva tarea
    const{title,setTitle}=useState([]);

    //obtener token para guardar las tareas
    const token=localStorage.getItem("token");

    //Consulto tareas al backend
    const getTasks=async()=>{
        try{
        const res = await axios.get("http://localhost:3000/api/task",{
            headers:{
                Authorization:token //enviamos token
            }
        });
    //Guardamos el estado de la tarea
    setTasks(res.data);

        }catch(error){
            console.error("Error al obtener tareas",error);
        }

    };

    
    //Crear una nueva tarea
    const createTasks=async()=>{
        try{
            await axios.post("http://localhost:3000/api/task",
                {title},
                {headers:{Authorization:token}}
            );
            //Limpiamos los input
            setTitle("");
            setTask();
        }catch(error){
            console.error("Error al crear tarea",error);
        }
    }

    //Se ejecuta al cargar un componente
    useEffect(()=>{
        const fechTasks = async () => {
            try{
                const res = await axios.get("http://localhost:3000/api/tasks",{
                    headers:{Authorization:token}
                });
                setTasks(res.data);
            }catch(error){
                console.error("Error al obtener tareas",error);
            }
        };
        fechTasks();
    },[token]);

    return(
        <div>
            <h2>Mis Tareas</h2>
            {/*input para nueva tarea*/}
            <input value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder="Nueva Tarea"
            type="text"/>

            {/*Boton de crear tarea*/}
            <button onClick={createTask}>Crear</button>

            {/*Lista de tareas*/}
            {task.map(t=>{
                <div key={t.id}>
                    {t.title}
                </div>
            })}
        </div>
    )
}

export default Dashboard;
