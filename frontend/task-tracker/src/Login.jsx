import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {

            alert("Please fill all fields.");

            return;

        }

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            localStorage.setItem("token", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful");

            navigate("/dashboard");

        }

        catch (error) {

            alert(error.response?.data?.message || "Login Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >

            <div
                className="card shadow-lg p-4"
                style={{
                    width: "430px",
                    borderRadius: "15px"
                }}
            >

                <h2 className="text-center text-primary mb-4">
                    Login
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Logging In..."
                                : "Login"
                        }

                    </button>

                </form>

                <p className="text-center mt-3">

                    Don't have an account?

                    <Link
                        to="/"
                        className="text-decoration-none ms-2"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

};

export default Login;