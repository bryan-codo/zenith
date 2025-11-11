import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface LoginProps {
  onSwitchToSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('demo@zenithos.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    // onAuthStateChange in App.tsx will handle successful login
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleLogin}
          className="bg-white/60 backdrop-blur-lg rounded-xl border border-gray-200/80 shadow-sm p-8 space-y-6"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-accent rounded-full mb-2"></div>
            <h1 className="text-2xl font-bold text-gray-800">Zenith Health OS</h1>
            <p className="text-gray-500">Please sign in to continue</p>
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
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
              required
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
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <button type="button" onClick={onSwitchToSignUp} className="font-medium text-accent hover:underline">
              Create an account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
