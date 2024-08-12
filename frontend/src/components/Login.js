import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://inotebook-live.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.authToken) {
          localStorage.setItem("token", json.authToken);
          props.showAlert("You have successfully logged in!", "success");
          navigate("/home");
        } else {
          props.showAlert(
            "The credentials you entered are incorrect. Please try again.",
            "danger"
          );
        }
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.error ||
          "The credentials you entered are incorrect. Please try again.";
        props.showAlert(errorMessage, "danger");
      }
    } catch (error) {
      console.error("There was an error with the fetch operation:", error);
      props.showAlert(
        "An error occurred while logging in. Please try again later.",
        "danger"
      );
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-grey dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              id="email"
              name="email"
              placeholder="Enter email"
              value={credential.email}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              id="password"
              name="password"
              placeholder="Password"
              value={credential.password}
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          <div>
            <p className="text-gray-300">
              Don't have an account?{" "}
              <a
                href="/signup"
                onClick={handleSignUpClick}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
