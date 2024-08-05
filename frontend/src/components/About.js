import React from 'react';

const About = () => {
  return (
   
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">About Us</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Welcome to iNotebook, your go-to web application for organizing and storing your notes effortlessly. Whether you're jotting down important ideas, planning your next project, or simply keeping track of daily tasks, iNotebook has got you covered.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Our platform is designed with simplicity and efficiency in mind. With iNotebook, you can easily create, edit, and manage your notes from anywhere, anytime. Enjoy a clean and intuitive interface that makes note-taking a breeze.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            We are committed to providing you with a seamless experience and continuously improving our features to meet your needs. Your feedback helps us grow, and we’re always looking for ways to enhance your note-taking journey.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Thank you for choosing iNotebook. We’re excited to help you stay organized and productive with our easy-to-use note-taking platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
