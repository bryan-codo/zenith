import React, { useState } from 'react';

interface SignUpProps {
  onSignUp: () => void;
  onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      setError('');
      // In a real app, you would register the user here
      onSignUp();
    } else {
      setError('Please fill out all fields.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSignUp}
          className="bg-white/60 backdrop-blur-lg rounded-xl border border-gray-200/80 shadow-sm p-8 space-y-6"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-accent rounded-full mb-2"></div>
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-500">Get started with Zenith Health OS</p>
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password"  className="text-sm font-medium text-gray-700 block mb-2">
              Password
            </label>
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors"
          >
            Create Account
          </button>

           <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <button type="button" onClick={onSwitchToLogin} className="font-medium text-accent hover:underline">
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;