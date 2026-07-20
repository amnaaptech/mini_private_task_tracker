import { Link } from "react-router-dom";

const Dashboard = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    
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
                    className="col-md-2 bg-dark text-white vh-100 p-4"
                >

                    <h3 className="text-center mb-5">
                        Task Tracker
                    </h3>

                    {/* <Link
                        to="/dashboard"
                        className="btn btn-outline-light w-100 mb-3"
                    >
                        Task Tracker Dashboard
                    </Link> */}

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

                    <Link
                        to="/Updatetasks"
                        className="btn btn-outline-light w-100 mb-3"
                    >
                        Update Tasks
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

                    <div className="d-flex justify-content-between align-items-center bg-light shadow p-3">

                        <h4>
                           Task Tracker Dashboard
                        </h4>

                        <div className="d-flex align-items-center">

                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                width="45"
                                alt="profile"
                                className="rounded-circle me-2"
                            />

                            <h6 className="mb-0">

                                {user?.username}

                            </h6>

                        </div>

                    </div>

                    {/* Body */}

                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            height: "80vh"
                        }}
                    >

                        <div className="text-center">

                            <h1>

                                Welcome Dear 👋

                            </h1>

                            <h2
                                className="text-primary mt-3"
                            >

                                {user?.username}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Dashboard;