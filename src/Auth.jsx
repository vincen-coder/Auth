import React, { useState } from 'react';
import { signUpUser, loginUser } from './api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false); // Toggle: false = Signup, true = Login
  
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- ACTIONS ---

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create user object (excluding confirmPassword)
      const userPayload = {
        name: formData.name,
        number: formData.number,
        email: formData.email,
        password: formData.password
      };

      await signUpUser(userPayload);
      alert("Account Created! Please Login.");
      setIsLogin(true); // Switch to login screen
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const foundUsers = await loginUser(formData.email, formData.password);

      if (foundUsers.length > 0) {
        alert(`Welcome back, ${foundUsers[0].name}!`);
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <div className="space-y-4">
          
          {/* SIGN UP FIELDS (Hidden during Login) */}
          {!isLogin && (
            <>
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                name="number"
                placeholder="Phone Number"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </>
          )}

          {/* COMMON FIELDS */}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* CONFIRM PASSWORD (Hidden during Login) */}
          {!isLogin && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          )}

          {/* ACTION BUTTON */}
          <button
            onClick={isLogin ? handleLogin : handleSignUp}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {/* TOGGLE TEXT */}
          <p className="text-center text-sm text-gray-600 mt-4">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Auth;
