import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); 
  const [isOtpVerified, setIsOtpVerified] = useState(false); 
  const [loginWithOtp, setLoginWithOtp] = useState(false); // State to switch between password and OTP login
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post('https://blash-assignment.onrender.com/api/auth/send-otp', { email });
      setIsOtpSent(true); 
      alert('OTP sent to your email!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP, please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('https://blash-assignment.onrender.com/api/auth/verify-otp', { email, otp });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); 
        console.log('Token saved to localStorage');
        navigate('/'); 
      } else {
        console.error('No token found in response');
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      alert('Invalid OTP');
    }
  };

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
      console.error('Login error', error.response?.data?.message || error.message);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>

        {/* Toggle for choosing login method */}
        <div className="mb-4 text-center">
          <button 
            onClick={() => setLoginWithOtp(false)} 
            className={`mr-4 ${!loginWithOtp ? 'font-semibold text-blue-600' : 'text-gray-600'}`}
          >
            Password Login
          </button>
          <button 
            onClick={() => setLoginWithOtp(true)} 
            className={`${loginWithOtp ? 'font-semibold text-blue-600' : 'text-gray-600'}`}
          >
            OTP Login
          </button>
        </div>

        {/* Password login form */}
        {!loginWithOtp ? (
          <>
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
          </>
        ) : (
          // OTP login form
          <>
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
            {!isOtpSent ? (
              <button
                onClick={handleSendOtp}
                className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send OTP
              </button>
            ) : (
              <>
                <div className="mb-6">
                  <label htmlFor="otp" className="block text-gray-700">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full py-2 mt-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Verify OTP
                </button>
              </>
            )}
          </>
        )}

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
