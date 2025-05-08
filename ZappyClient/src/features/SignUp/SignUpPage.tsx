import React, { useState, useEffect, type ChangeEvent } from "react"
import { FloatingLabelInput } from "../../components/floating-label-input"
import { CustomCheckbox } from "../../components/custom-checkbox"
import { ImageUpload } from "../../components/image-upload"
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

// Add this CSS to your global styles or create a new CSS file and import it
// Complete animation styles to add to both pages
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

/* Button animations - Simple Scale */
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

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    mail: "",
    description: "",
    age: "",
  })

  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [contentType, setContentType] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [key, setKey] = useState(0) // Used to force animation replay

  // This effect will run when the component mounts or when the route changes
  useEffect(() => {
    // Reset the key to force animation replay
    setKey(prevKey => prevKey + 1)
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageUpload = (file: File | null) => {
    if (file) {
      setProfilePicture(file)
      setContentType(file.type)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setProfilePicture(null)
      setContentType(null)
      setPreviewUrl(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create the request object matching your C# class
    const requestData = {
      name: formData.name,
      username: formData.username,
      password: formData.password,
      mail: formData.mail,
      profilePicture: previewUrl?.split(",")[1] || null, // Base64 data without the prefix
      contentType: contentType,
      description: formData.description || null,
      age: formData.age ? Number.parseInt(formData.age) : null,
    }

    console.log("Signup data:", requestData)
    // Here you would send the data to your API
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <>
      {/* Add the styles to the page */}
      <style>{animationStyles}</style>
      
      <div className="flex h-screen">
        {/* Left Side (Signup Form) */}
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 overflow-auto">
          <div key={key} className="w-full max-w-md">
            <Link
              to="/"
              className="inline-flex items-center text-purple-600 mb-6 hover:text-purple-700 transition-colors animate-fade-in-up"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to login</span>
            </Link>

            <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate-fade-in-up animation-delay-100">Create an account</h2>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in-up animation-delay-200">Please enter your details to sign up</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up animation-delay-300">
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

              <div className="animate-fade-in-up animation-delay-400">
                <FloatingLabelInput
                  id="mail"
                  name="mail"
                  type="email"
                  label="Email address"
                  value={formData.mail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up animation-delay-500">
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

              <div className="animate-fade-in-up animation-delay-600">
                <ImageUpload onImageUpload={handleImageUpload} previewUrl={previewUrl} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up animation-delay-700">
                <FloatingLabelInput
                  id="age"
                  name="age"
                  type="number"
                  label="Age (optional)"
                  value={formData.age}
                  onChange={handleInputChange}
                />

                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`
                      block w-full px-4 pt-6 pb-2 
                      border border-gray-300 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                      transition-all duration-300 ease-out
                      min-h-[80px]
                    `}
                    placeholder=" "
                  />
                  <label
                    htmlFor="description"
                    className={`
                      absolute text-gray-500 text-xs top-2 left-4 scale-90
                      duration-300 transform transition-all ease-out
                      pointer-events-none
                    `}
                  >
                    Description (optional)
                  </label>
                </div>
              </div>

              <div className="mt-6 animate-fade-in-up animation-delay-800">
                <CustomCheckbox
                  id="terms"
                  label="I agree to the Terms of Service and Privacy Policy"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />
              </div>

              <div className="animate-fade-in-up animation-delay-800">
                <button
                    type="submit"
                    disabled={!agreeTerms}
                    className={`
                    w-full py-2.5 rounded-lg transition-all duration-300 mt-6
                    ${
                        agreeTerms
                        ? "text-white btn-scale"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                    `}
                >
                    Create account
                </button>
              </div>

              <p className="mt-4 text-center text-sm text-gray-600 animate-fade-in-up animation-delay-800">
                Already have an account?{" "}
                <Link to="/" className="text-purple-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="hidden md:flex flex-1 bg-purple-600 items-center justify-center">
          {!imageError ? (
            <img
              src="/placeholder.svg?height=500&width=500"
              alt="Signup Illustration"
              className="max-w-sm w-full h-auto"
              onError={handleImageError}
            />
          ) : (
            <div className="text-white text-center p-8">
              <h3 className="text-2xl font-bold mb-4">Join our Community</h3>
              <p className="text-lg">Create an account to access all features and connect with others.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}