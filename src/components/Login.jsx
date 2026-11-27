import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye, EyeOff } from 'lucide-react';
import coverImage from '../assets/cover-image.png';

export const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-200/60 flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Auth Card Container */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Left Side: Orange Marketing Banner */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-between min-h-[480px] relative overflow-hidden">
          <div className="space-y-4 z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Simplify management with our{' '}
              <span className="underline decoration-white/60 underline-offset-4">dashboard</span>.
            </h2>
            <p className="text-orange-100 text-sm leading-relaxed">
              Simplify your e-commerce management with our user-friendly admin dashboard.
            </p>
          </div>

          {/* 3D Character Illustration stored in assets */}
          <div className="relative z-10 flex justify-center items-end mt-4">
            <img
              src={coverImage}
              alt="Cover Characters"
              className="h-60 sm:h-72 object-contain drop-shadow-2xl"
            />
          </div>

          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Right Side: Form Section (No Validations) */}
        <div className="p-2 sm:p-6 flex flex-col justify-center">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <span className="font-bold text-base text-slate-800 tracking-tight">
              E Spurt
            </span>
          </div>

          {/* Headings */}
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-slate-400 text-xs mt-1 mb-6">
            {isSignup ? 'Please sign up for your account' : 'Please login to your account'}
          </p>

          {/* Form */}
          <form noValidate onSubmit={handleSubmit} className="space-y-3.5">
            {isSignup && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2.5 bg-slate-100 border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:bg-white"
              />
            )}

            <input
              type="text"
              placeholder="Email address"
              className="w-full px-4 py-2.5 bg-slate-100 border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:bg-white"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-4 py-2.5 bg-slate-100 border border-transparent rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:bg-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {!isSignup && (
              <div className="text-right">
                <a href="#" className="text-[11px] text-slate-400 hover:text-orange-500">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs rounded-xl shadow-md transition-all active:scale-[0.99] mt-2"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium">
              Or Login with
            </span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              <span className="text-sm font-bold text-blue-600">G</span> Google
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              <span className="text-sm font-bold text-blue-700">f</span> Facebook
            </button>
          </div>

          {/* Toggle between Login and Signup */}
          <p className="text-center text-xs text-slate-400 mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-orange-500 font-bold hover:underline"
            >
              {isSignup ? 'Login' : 'Signup'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
