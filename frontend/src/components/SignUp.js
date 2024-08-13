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
      props.showAlert(
        "Passwords do not match. Please check and try again.",
        "danger"
      );
      return;
    }

    try {
      const response = await fetch(
        "https://inotebook-live.onrender.com/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credential.name,
            email: credential.email,
            password: credential.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }

      const json = await response.json();
      if (json.authToken) {
        localStorage.setItem("token", json.authToken);
        props.showAlert(
          "Your account has been created successfully!",
          "success"
        );
        navigate("/home");
      } else {
        props.showAlert(
          "There was an issue creating your account. Please try again.",
          "danger"
        );
      }
    } catch (error) {
      if (error.message.includes("Email address already registered")) {
        props.showAlert(
          "The email address is already registered. Please use a different email.",
          "danger"
        );
      } else {
        props.showAlert(
          "An error occurred while creating your account. Please try again later.",
          "danger"
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-grey dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-6 text-center">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={credential.name}
              onChange={onChange}
              required
            />
          </div>
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
          <div>
            <label
              htmlFor="cpassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              id="cpassword"
              name="cpassword"
              placeholder="Confirm Password"
              value={credential.cpassword}
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            SignUp
          </button>
          <p className="text-gray-300">
            Already have an account?
            <a href="/" className="text-blue-500 hover:text-blue-700">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
