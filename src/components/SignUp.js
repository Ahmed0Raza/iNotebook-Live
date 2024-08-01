import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credential.password !== credential.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          password: credential.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }

      const json = await response.json();
      console.log(json);

      if (json.authToken) {
        localStorage.setItem("token", json.authToken);
        props.showAlert("Successfully created account", "success");
        navigate("/home");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("There was an error with the fetch operation:", error);
      if (error.message === "Email address already registered") {
        props.showAlert("Email already registered", "danger");
      } else {
        props.showAlert("Failed to create account, please try again later", "danger");
      }
    }
  };

  return (
    <>
    <div className="container">
            <h2>Create an Account</h2>
        </div>
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter Name"
            value={credential.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={credential.email}
            onChange={onChange}
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={credential.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            value={credential.cpassword}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default SignUp;
