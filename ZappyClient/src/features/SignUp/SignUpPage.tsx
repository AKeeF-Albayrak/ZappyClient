import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import useSignup from "./useSignUp";
import { ImageUpload } from "../../components/image-upload";
import { FloatingLabelInput } from "../../components/floating-label-input";
import { CustomCheckbox } from "../../components/custom-checkbox";
import CalendarDatePicker from "../../components/CalendarDatePicker";

const animationStyles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
`;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { signup, isLoading, error, success } = useSignup();

  useEffect(() => {
    if (success) {
      // Optionally handle success, e.g., redirect to login
      console.log("Signup successful!");
    }
  }, [success]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Call the signup API using the custom hook
    signup({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      dateOfBirth: formData.dateOfBirth,
      profilePicture: previewUrl,
    });
  };

  return (
    <>
      {/* Add the styles to the page */}
      <style>{animationStyles}</style>
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 overflow-auto">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-flex items-center text-purple-600 mb-6 hover:text-purple-700 transition-colors animate-fade-in-up">
              <span>Back to login</span>
            </Link>

            <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate-fade-in-up">Create an account</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex justify-center mb-4">
                <ImageUpload onImageUpload={handleImageUpload} previewUrl={previewUrl} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up">
                <FloatingLabelInput
                  id="name"
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <FloatingLabelInput
                  id="username"
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <FloatingLabelInput
                id="email"
                name="email"
                type="email"
                label="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up">
                <FloatingLabelInput
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <FloatingLabelInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="animate-fade-in-up">
                <CalendarDatePicker
                  id="dateOfBirth"
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  required
                />
              </div>

              <CustomCheckbox
                id="terms"
                label="I agree to the Terms of Service and Privacy Policy"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />

              <button
                type="submit"
                disabled={!agreeTerms || isLoading}
                className={`w-full py-2.5 rounded-lg transition-all duration-300 mt-6 ${agreeTerms ? "text-white btn-scale" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                {isLoading ? "Creating..." : "Create account"}
              </button>

              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
