import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface SignUpProps {
  onSwitchToLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // You can add user metadata here if needed
        // data: { full_name: name }
      }
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
        if (data.user.identities && data.user.identities.length === 0) {
            setError("This user already exists.");
        } else {
            setMessage("Success! Please check your email to confirm your account.");
        }
    }
    setLoading(false);
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
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}
          
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
              Password (at least 6 characters)
            </label>
            <input 
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:bg-gray-400"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
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
