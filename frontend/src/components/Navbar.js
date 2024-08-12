import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
    props.showAlert("You have successfully logged out!", "success");
  };

  const handleHomeClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/home");
      setActiveNav("/home");
    } else {
      navigate("/");
      setActiveNav("/");
    }
  };

  const handleAboutClick = () => {
    navigate("/about");
    setActiveNav("/about");
  };

  React.useEffect(() => {
    setActiveNav(location.pathname);
  }, [location]);

  return (
    <nav className="sticky top-0 z-10 bg-gray-200 p-4 dark:bg-gray-900 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h3 className="text-2xl font-bold tracking-tighter dark:text-gray-400 md:text-3xl">
            iNoteBook
          </h3>
          <div className="flex items-center space-x-6 dark:text-gray-400">
            <button
              className={`relative py-2 text-md font-medium ${activeNav === "/home" ? "text-white" : "text-gray-400"} group`}
              onClick={handleHomeClick}
            >
              Home
              <span className={`absolute left-0 bottom-0 w-full h-0.5 ${activeNav === "/home" ? "bg-white" : "bg-gray-400"} transition-transform duration-300 ease-in-out transform scale-x-100`}></span>
            </button>
            <button
              className={`relative py-2 text-md font-medium ${activeNav === "/about" ? "text-white" : "text-gray-400"} group`}
              onClick={handleAboutClick}
            >
              About
              <span className={`absolute left-0 bottom-0 w-full h-0.5 ${activeNav === "/about" ? "bg-white" : "bg-gray-400"} transition-transform duration-300 ease-in-out transform scale-x-100`}></span>
            </button>
          </div>
        </div>
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden text-white focus:outline-none bg-gray-700 p-2 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <div className="hidden md:flex items-center space-x-4">
            {!localStorage.getItem('token') ? (
              <div className="flex space-x-4">
                <Link 
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                  to="/" 
                  role="button"
                >
                  Login
                </Link>
                <Link 
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
                  to="/signup" 
                  role="button"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <button 
                onClick={handleLogout} 
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 ease-in-out"
              >
                Logout
              </button>
            )}
          </div>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded-md shadow-lg md:hidden">
              {!localStorage.getItem('token') ? (
                <>
                  <Link 
                    className="block px-4 py-2 text-sm hover:bg-gray-600" 
                    to="/" 
                    role="button"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    className="block px-4 py-2 text-sm hover:bg-gray-600" 
                    to="/signup" 
                    role="button"
                    onClick={() => setMenuOpen(false)}
                  >
                    SignUp
                  </Link>
                </>
              ) : (
                <button 
                  onClick={() => {handleLogout(); setMenuOpen(false);}} 
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
