import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-4">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/" className="hover:text-orange-500 transition-colors duration-300">Privacy Policy</a>
          <a href="/" className="hover:text-orange-500 transition-colors duration-300">Terms of Service</a>
          <a href="/" className="hover:text-orange-500 transition-colors duration-300">Contact Us</a>
        </div>
        <p className="text-xs">
          Crafted with passion by <strong>Developers</strong>. MERN app.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
