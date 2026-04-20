import { useState } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = () => {
    if (!form.email || !form.password) return setError('Please fill in all fields');
    if (!validateEmail(form.email)) return setError('Please enter a valid email address');
    login({ name: form.email.split('@')[0] || 'User', email: form.email });
    onClose();
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password)
      return setError('Please fill in all fields');
    if (!validateEmail(form.email)) return setError('Please enter a valid email address');
    if (form.password !== form.confirm)
      return setError('Passwords do not match');
    if (form.password.length < 6)
      return setError('Password must be at least 6 characters');
    login({ name: form.name, email: form.email });
    onClose();
  };

  const handleForgot = () => {
    if (!form.email) return setError('Please enter your email');
    setSuccess(`Reset link sent to ${form.email}`);
  };

  const handleGoogleLogin = () => {
    login({ name: 'Google User', email: 'google@example.com', avatar: 'G' });
    onClose();
  };

  const resetForm = (newMode) => {
    setForm({ name: '', email: '', password: '', confirm: '' });
    setError('');
    setSuccess('');
    setMode(newMode);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-black dark:focus:border-gray-300 transition-colors";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[999]"
          />

          {/* ✅ div عادي للـ positioning - بدون framer-motion */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              width: '100%',
              maxWidth: '28rem',
              padding: '0 1rem',
            }}
          >
            {/* ✅ framer-motion على الـ div الداخلي بس */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <FaTimes size={18} />
              </button>

              {/* Logo */}
              <div className="text-center mb-6">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">SM</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {mode === 'login' && 'Welcome back!'}
                  {mode === 'register' && 'Create your account'}
                  {mode === 'forgot' && 'Reset your password'}
                </p>
              </div>

              {/* Google Button */}
              {mode !== 'forgot' && (
                <>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors mb-4"
                  >
                    <FaGoogle size={16} className="text-red-500" />
                    Continue with Google
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                    <span className="text-xs text-gray-400">or</span>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                  </div>
                </>
              )}

              {/* Form Fields */}
              <div className="space-y-3">
                {mode === 'register' && (
                  <input
                    className={inputClass}
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                  />
                )}

                <input
                  className={inputClass}
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />

                {mode !== 'forgot' && (
                  <div className="relative">
                    <input
                      className={inputClass}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                )}

                {mode === 'register' && (
                  <input
                    className={inputClass}
                    type="password"
                    placeholder="Confirm Password"
                    value={form.confirm}
                    onChange={(e) => update('confirm', e.target.value)}
                  />
                )}
              </div>

              {/* Forgot Password Link */}
              {mode === 'login' && (
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={() => resetForm('forgot')}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Error / Success */}
              {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
              {success && <p className="text-green-500 text-xs mt-3">✓ {success}</p>}

              {/* Submit Button */}
              <button
                type="button"
                onClick={
                  mode === 'login' ? handleLogin
                  : mode === 'register' ? handleRegister
                  : handleForgot
                }
                className="w-full mt-4 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                {mode === 'login' && 'Sign In'}
                {mode === 'register' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
              </button>

              {/* Switch Mode */}
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                {mode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => resetForm('register')}
                      className="font-semibold text-gray-900 dark:text-gray-100 hover:underline"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => resetForm('login')}
                      className="font-semibold text-gray-900 dark:text-gray-100 hover:underline"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AuthModal;