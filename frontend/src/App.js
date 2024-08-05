import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      alertType: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const LocationWrapper = () => {
    const location = useLocation();

    return (
      <>
        {location.pathname !== "/about" && <Alert alert={alert} />}
      </>
    );
  };

  return (
    <>
      <div className="bg-gray-200 dark:bg-gray-900 min-h-screen">
        <NoteState>
          <Router>
            <Navbar />
            <LocationWrapper />
            <div className="container">
              <Routes>
                <Route path="/" element={<Login showAlert={showAlert} />} />
                <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
                <Route path="/about" element={<About />} />
                <Route path="/home" element={<Home showAlert={showAlert} />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </NoteState>
      </div>
    </>
  );
}

export default App;
