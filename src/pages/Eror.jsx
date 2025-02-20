import React from 'react';
// import { useHistory } from 'react-router-dom'; // For redirecting to the homepage
import { FaExclamationTriangle } from 'react-icons/fa'; // For an icon
import { NavLink } from 'react-router-dom';

const Eror = () => {

 

  return (
    <div className="h-screen bg-gradient-to-r from-teal-600 via-cyan-700 to-black flex items-center justify-center text-white p-8">
      <div className="text-center">
        <FaExclamationTriangle className="text-6xl mb-4" />
        <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-lg mb-6">
          We couldn't find the page you're looking for. Please check the URL or click the button below to go back to the homepage.
        </p>
        <NavLink to='/'
          
          className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300"
        >
          Go to Homepage
        </NavLink>
      </div>
    </div>
  );
};

export default Eror;
