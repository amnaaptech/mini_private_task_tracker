import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowTasks = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchTasks();

    }, []);

    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/tasks/show",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTasks(response.data.tasks);

        }

        catch (error) {

            console.log(error);

            alert("Unable to fetch tasks.");

        }

        finally {

            setLoading(false);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };


    const deleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );
    
        if (!confirmDelete) return;
    
        try {
    
            const token = localStorage.getItem("token");
    
            const response = await axios.delete(
                `http://localhost:5000/api/tasks/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            alert(response.data.message);
    
            // Refresh task list
            fetchTasks();
    
        }
    
        catch (error) {
    
            alert(error.response?.data?.message || "Delete failed.");
    
        }
    
    };

    return (

        <div className="container-fluid">

            <div className="row">

                {/* Sidebar */}

                <div
                    className="col-md-2 bg-dark text-white p-4"
                    style={{ minHeight: "100vh" }}
                >

                    <h3 className="text-center mb-5">

                        Task Tracker

                    </h3>

                    <Link
                        to="/dashboard"
                        className="btn btn-outline-light w-100 mb-3"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/Addtask"
                        className="btn btn-outline-light w-100 mb-3"
                    >
                        Add Task
                    </Link>

                    <Link
                        to="/showtasks"
                        className="btn btn-primary w-100 mb-3"
                    >
                        Show Tasks
                    </Link>

                    <button
                        className="btn btn-danger w-100 mt-3"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

                {/* Main */}

                <div className="col-md-10">

                    {/* Header */}

                    <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">

                        <h4>

                            My Tasks

                        </h4>

                        <div className="d-flex align-items-center">

                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                width="45"
                                className="rounded-circle me-2"
                                alt="profile"
                            />

                            <strong>

                                {user?.username}

                            </strong>

                        </div>

                    </div>

                    {/* Body */}

                    <div className="container mt-4">

                        <div className="row">

                            {

                                loading ?

                                    (

                                        <h4 className="text-center">

                                            Loading...

                                        </h4>

                                    )

                                    :

                                    tasks.length === 0 ?

                                        (

                                            <h4 className="text-center text-danger">

                                                No Tasks Found

                                            </h4>

                                        )

                                        :

                                        tasks.map((task) => (

                                            <div
                                                className="col-md-6 mb-4"
                                                key={task._id}
                                            >

                                                <div className="card shadow">

                                                    <div className="card-body">

                                                        <h4>

                                                            {task.title}

                                                        </h4>

                                                        <p>

                                                            <strong>Status : </strong>

                                                            {

                                                                task.status === "Completed"

                                                                    ?

                                                                    <span className="badge bg-success">

                                                                        Completed

                                                                    </span>

                                                                    :

                                                                    <span className="badge bg-warning text-dark">

                                                                        Pending

                                                                    </span>

                                                            }

                                                        </p>

                                                        <div className="d-flex justify-content-between">

                                                        <button
    className="btn btn-dark"
    onClick={() => navigate(`/Updatetasks/${task._id}`)}
>
    Edit
</button>

                                                            <button
    className="btn btn-danger"
    onClick={() => deleteTask(task._id)}
>
    Delete
</button>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        ))

                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ShowTasks;