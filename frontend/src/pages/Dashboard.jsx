import { useEffect, useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token)navigate("/");
    },[]);

    //obtener tareas
    const getTasks = async () => {
        const res=await axios.get("http://localhost:3000/api/tasks",{
            headers:{Authorization: token}
        });
        setTasks(res.data);
    };

    useEffect(() => {
        if(token) getTasks();
    },[]);
}