import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credential, setCredential] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credential.email, password: credential.password })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            console.log(json);
            if (json.success) {
                // Store the token in localStorage
                localStorage.setItem('token', json.authToken);
                props.showAlert("Logged in successfully", "success");
                navigate("/home");
            } else {
                // Remove the token from localStorage
                props.showAlert("Invalid credentials", "danger");
            }
        } catch (error) { 
            console.error('There was a problem with the fetch operation:', error);
            localStorage.removeItem('token');
            props.showAlert("Failed to login, please try again later", "danger");
        }
    };
    
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    return (
        <>
        <div className="container">
            <h2>Login in to Continue to iNoteBook</h2>
        </div>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={credential.email}
                        onChange={onChange}
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control my-2"
                        id="password"
                        name="password"
                        value={credential.password}
                        onChange={onChange}
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    );
};

export default Login;
