import { useEffect, useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, CheckCircle } from "lucide-react";

function Dashboard(){
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [editingTask, setEditingTask] = useState(null);

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
    
    //Crear tareas
    const createTask = async ()=> {
        await axios.post("http://localhost:3000/api/tasks",
            {title, description},
            {headers:{Authorization:token}}
        );
        setTitle("");
        setDescription("");
        getTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
            headers: { Authorization: token }
        });
        getTasks(); // refresca la lista
    };

    const updateTask = async (id, updatedData) => {
        await axios.put(
            `http://localhost:3000/api/tasks/${id}`,
            updatedData,
            {
                headers: { Authorization: token }
            }
        );
        getTasks(); // refrescar lista
    };

    return(
        <div className="min-h-screen bg-gray-100 p-6">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">📋 Mis Tareas</h2>
                <button onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded">
                    Cerrar sesión
                </button>
            </div>
            {/* FORM */}
            <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-2">
                <input className="border p-2 flex-1 rounded" placeholder="Título" value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
                    
                <input className="border p-2 flex-1 rounded" placeholder="Descripción" value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={createTask} className="bg-blue-500 text-white px-4 rounded">
                    +
                </button>
            </div>
            {/* LISTA */}
            <div className="grid gap-4">
                {tasks.map((t) => (
                <div key={t.id} className="bg-white p-4 rounded-xl shadow flex justify-between">
                    <div>
                        <h3 className="font-bold">{t.title}</h3>
                        <p className="text-gray-500 text-sm">{t.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        
                        <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            <CheckCircle size={14} />
                            Activa
                        </span>

                        <button
                            onClick={() => setEditingTask(t)}
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm"
                        >
                            <Pencil size={16} />
                            Editar
                        </button>

                        <button
                            onClick={() => deleteTask(t.id)}
                            className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
                        >
                            <Trash2 size={16} />
                            Eliminar
                        </button>

                    </div>                 
                </div>))}
            </div>

            {editingTask && (
                <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center">
                    
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">✏️ Editar tarea</h3>

                        <input
                            className="w-full border p-2 rounded mb-3"
                            placeholder="Título"
                            value={editingTask.title}
                            onChange={(e) =>
                                setEditingTask({ ...editingTask, title: e.target.value })
                            }
                        />

                        <textarea
                            className="w-full border p-2 rounded mb-4"
                            placeholder="Descripción"
                            value={editingTask.description}
                            onChange={(e) =>
                                setEditingTask({ ...editingTask, description: e.target.value })
                            }
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setEditingTask(null)}
                                className="px-4 py-2 rounded bg-gray-300"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={() => {
                                    updateTask(editingTask.id, editingTask);
                                    setEditingTask(null);
                                }}
                                className="px-4 py-2 rounded bg-blue-500 text-white"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard;