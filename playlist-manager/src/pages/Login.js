import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://blash-assignment.onrender.com/api/auth/login', {
        email,
        password,
      });
      console.log('Response Data:', response.data); 

      if (response.data.token) {
        localStorage.setItem('token', response.data.token); 
        console.log('Token saved to localStorage');
        navigate('/'); 
      } else {
        console.error('No token found in response');
        alert('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error', error.response.data.message);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
