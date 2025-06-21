"use client"

import type React from "react"
import { useState, useEffect, type ChangeEvent } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import useSignup from "./useSignUp"
import { CircularImageUpload } from "../../components/circular-image-upload"
import { FloatingLabelInput } from "../../components/floating-label-input"
import { PasswordInput } from "../../components/password-input"
import { CustomCheckbox } from "../../components/custom-checkbox"
import CalendarDatePicker from "../../components/CalendarDatePicker"

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
.animation-delay-900 { animation-delay: 0.9s; }

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
`

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    mail: "",
    password: "",
    confirmPassword: "",
    description: "",
    birthDate: "",
  })

  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const { signup, isLoading, error, success } = useSignup()

  useEffect(() => {
    if (success) {
      console.log("Signup successful!")
    }
  }, [success])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleDateChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageUpload = (file: File | null) => {
    setProfilePictureFile(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        const base64 = result.split(",")[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setPasswordError("")

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long")
      return
    }

    let profilePictureBase64 = null
    let contentType = null

    if (profilePictureFile) {
      try {
        profilePictureBase64 = await convertFileToBase64(profilePictureFile)
        contentType = profilePictureFile.type
      } catch (error) {
        console.error("Error converting image to base64:", error)
      }
    }

    signup({
      name: formData.name,
      username: formData.username,
      mail: formData.mail,
      password: formData.password,
      profilePicture: profilePictureBase64,
      contentType: contentType,
      description: formData.description || null,
      birthDate: formData.birthDate,
    })
  }

  return (
    <>
      <style>{animationStyles}</style>
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 overflow-auto relative">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="inline-flex items-center text-purple-600 mb-6 hover:text-purple-700 transition-colors animate-fade-in-up group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span>Back to login</span>
            </Link>

            <h2 className="text-3xl font-semibold text-gray-800 mb-6 animate-fade-in-up">Create an account</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex justify-center mb-6">
                <CircularImageUpload onImageUpload={handleImageUpload} previewUrl={previewUrl} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up animation-delay-200">
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

              <div className="animate-fade-in-up animation-delay-300">
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

              <div className="animate-fade-in-up animation-delay-400">
                <CalendarDatePicker
                  id="birthDate"
                  label="Date of Birth"
                  value={formData.birthDate}
                  onChange={handleDateChange}
                  required
                />
              </div>

              <div className="animate-fade-in-up animation-delay-400">
                <PasswordInput
                  id="password"
                  name="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="animate-fade-in-up animation-delay-500">
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="animate-fade-in-up animation-delay-600">
                <FloatingLabelInput
                  id="description"
                  name="description"
                  label="Description (Optional)"
                  value={formData.description}
                  onChange={handleInputChange}
                  multiline
                />
              </div>

              <div className="animate-fade-in-up animation-delay-800">
                <CustomCheckbox
                  id="terms"
                  label="I agree to the Terms of Service and Privacy Policy"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />
              </div>

              <button
                type="submit"
                disabled={!agreeTerms || isLoading || formData.password !== formData.confirmPassword}
                className={`w-full py-2.5 rounded-lg transition-all duration-300 mt-6 animate-fade-in-up animation-delay-900 ${
                  agreeTerms && formData.password === formData.confirmPassword && !passwordError
                    ? "text-white btn-scale"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Creating..." : "Create account"}
              </button>

              {passwordError && <p className="text-red-500 text-center mt-2">{passwordError}</p>}
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupPage
