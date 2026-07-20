import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const UpdateTask = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem("user"));

    const [title, setTitle] = useState("");

    const [status, setStatus] = useState("Pending");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        getSingleTask();

    }, []);

    const getSingleTask = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:5000/api/tasks/get/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setTitle(response.data.task.title);

            setStatus(response.data.task.status);

        }

        catch (error) {

            alert(error.response?.data?.message || "Unable to load task.");

        }

    };

    const updateTask = async (e) => {

        e.preventDefault();

        if (!title.trim()) {

            alert("Task title is required.");

            return;

        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:5000/api/tasks/update/${id}`,
                {
                    title,
                    status
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

            navigate("/showtasks");

        }

        catch (error) {

            alert(error.response?.data?.message || "Update failed.");

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
                        to="/AddTask"
                        className="btn btn-outline-light w-100 mb-3"
                    >
                        Add Task
                    </Link>

                    <Link
                        to="/showtasks"
                        className="btn btn-outline-light w-100 mb-3"
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

                        <h4>Edit Task</h4>

                        <div className="d-flex align-items-center">

                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                width="45"
                                className="rounded-circle me-2"
                                alt="Profile"
                            />

                            <strong>
                                {user?.username}
                            </strong>

                        </div>

                    </div>

                    {/* Form */}

                    <div className="container mt-5">

                        <div className="row justify-content-center">

                            <div className="col-md-7">

                                <div className="card shadow">

                                    <div className="card-body p-4">

                                        <h3 className="text-center text-dark mb-4">
                                            Update Task
                                        </h3>

                                        <form onSubmit={updateTask}>

                                            <div className="mb-3">

                                                <label className="form-label">
                                                    Task Title
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />

                                            </div>

                                            <div className="mb-4">

                                                <label className="form-label">
                                                    Status
                                                </label>

                                                <select
                                                    className="form-select"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                >

                                                    <option value="Pending">
                                                        Pending
                                                    </option>

                                                    <option value="Completed">
                                                        Completed
                                                    </option>

                                                </select>

                                            </div>

                                            <button
                                                className="btn btn-dark w-100"
                                                disabled={loading}
                                            >

                                                {
                                                    loading
                                                        ? "Updating..."
                                                        : "Update Task"
                                                }

                                            </button>

                                        </form>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default UpdateTask;