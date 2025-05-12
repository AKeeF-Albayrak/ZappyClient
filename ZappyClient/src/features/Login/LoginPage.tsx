import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FloatingLabelInput } from '../../components/floating-label-input';
import { CustomCheckbox } from '../../components/custom-checkbox';
import useLogin from './useLogin';

const animationStyles = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-500 { animation-delay: 0.5s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-700 { animation-delay: 0.7s; }
.animation-delay-800 { animation-delay: 0.8s; }

.btn-scale {
  background-color: #9333ea;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.btn-scale:hover {
  background-color: #7e22ce;
  transform: scale(1.02);
}
.btn-scale:active {
  transform: scale(0.98);
}

/* 🔄 Custom dual-color clip-path loader */
.loader {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;
}
.loader::before,
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 3px solid #FFF;
  animation: prixClipFix 2s linear infinite;
}
.loader::after {
  transform: rotate3d(90, 90, 0, 180deg);
  border-color: #FFF;
}

@keyframes rotate {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes prixClipFix {
  0%   { clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0); }
  50%  { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0); }
  75%, 100% { clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%); }
}
`;



const LoginPage = () => {
  const { login, isLoading, error } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <style>{animationStyles}</style>
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 overflow-hidden">
          <div key={key} className="w-full max-w-sm">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate-fade-in-up">Welcome back</h2>
            <p className="text-lg text-gray-600 mb-4 animate-fade-in-up animation-delay-100">Please enter your details</p>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="animate-fade-in-up animation-delay-200">
                <FloatingLabelInput
                  id="username"
                  type="username"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="animate-fade-in-up animation-delay-300">
                <FloatingLabelInput
                  id="password"
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between animate-fade-in-up animation-delay-400">
                <CustomCheckbox
                  id="remember"
                  label="Remember for 30 days"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <a href="#" className="text-sm text-purple-600 hover:underline">Forgot password?</a>
              </div>

              <div className="animate-fade-in-up animation-delay-500">
                <button
                  type="submit"
                  className="w-full py-2.5 text-white rounded-lg btn-scale flex justify-center items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loader"></span>
                  ) : (
                    "Sign In"
                  )}
                </button>


              </div>

              {error && <p className="text-center text-red-600 mt-2">{error}</p>}

              <p className="mt-4 text-center text-sm text-gray-600 animate-fade-in-up animation-delay-500">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-purple-600 hover:underline">Sign up</Link>
              </p>
            </form>
          </div>
        </div>

        <div className="flex-1 bg-purple-600 flex items-center justify-center">
          {!imageError ? (
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Login Illustration"
              className="max-w-sm w-full h-auto"
              onError={handleImageError}
            />
          ) : (
            <div className="text-white text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Welcome to our Platform</h3>
              <p className="text-lg">Sign in to access your account and manage your services.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
