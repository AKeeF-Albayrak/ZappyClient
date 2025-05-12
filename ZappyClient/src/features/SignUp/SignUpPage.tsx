import React, { useState, useRef, useEffect, type ChangeEvent } from "react"
import { FloatingLabelInput } from "../../components/floating-label-input"
import { CustomCheckbox } from "../../components/custom-checkbox"
import { Upload, X, ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, parseISO } from 'date-fns'

// Complete animation styles
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

// Image Upload Component
function ImageUpload({ onImageUpload, previewUrl }: { onImageUpload: (file: File | null) => void, previewUrl: string | null }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        onImageUpload(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0])
    }
  }

  const handleRemoveImage = () => {
    onImageUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-sm font-medium text-gray-700 mb-2 self-start">Profile Picture (optional)</p>

      {previewUrl ? (
        <div className="relative mb-4">
          {/* Circular profile picture container */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-300">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      ) : (
        <div
          className={`
            w-32 h-32 border-2 border-dashed rounded-full
            flex flex-col items-center justify-center
            transition-colors duration-200 cursor-pointer mb-4
            ${
              isDragging
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <Upload className="h-6 w-6 text-gray-400 mb-1" />
          <p className="text-xs text-gray-500 text-center px-2">
            <span className="text-purple-600 font-medium">Upload</span>
          </p>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
    </div>
  )
}

// Calendar Date Picker Component
function CalendarDatePicker({ id, label, value, onChange, required }: {
  id: string,
  label: string,
  value: string,
  onChange: (name: string, value: string) => void,
  required?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? parseISO(value) : null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  
  // Update selected date when value prop changes
  useEffect(() => {
    if (value) {
      try {
        setSelectedDate(parseISO(value))
      } catch (error) {
        setSelectedDate(null)
      }
    } else {
      setSelectedDate(null)
    }
  }, [value])
  
  // Format date for display
  const formatDisplayDate = (date: Date | null) => {
    if (!date) return ""
    return format(date, "dd.MM.yyyy")
  }
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }
  
  // Handle date selection
  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
    onChange(id, format(day, "yyyy-MM-dd"))
    setIsOpen(false)
  }
  
  // Toggle calendar visibility
  const toggleCalendar = () => {
    setIsOpen(!isOpen)
    if (!isOpen && selectedDate) {
      setCurrentMonth(selectedDate)
    }
  }
  
  // Generate calendar days
  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    
    const dateFormat = "EEE"
    const days = []
    
    // Days of week header
    const dayHeaders = []
    let startDateCopy = startDate
    for (let i = 0; i < 7; i++) {
      dayHeaders.push(
        <div key={`header-${i}`} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-500">
          {format(addDays(startDateCopy, i), dateFormat)}
        </div>
      )
    }
    days.push(<div key="header" className="grid grid-cols-7 mb-1">{dayHeaders}</div>)
    
    // Calendar days
    let day = startDate
    const rows = []
    
    while (day <= endDate) {
      let formattedDate = format(day, "d")
      const cloneDay = day
      rows.push(
        <div
          key={day.toString()}
          className={`
            w-8 h-8 flex items-center justify-center text-sm rounded-full cursor-pointer
            ${!isSameMonth(day, monthStart) ? "text-gray-300" : "text-gray-700"}
            ${isSameDay(day, new Date()) ? "bg-gray-100" : ""}
            ${selectedDate && isSameDay(day, selectedDate) ? "bg-purple-600 text-white" : ""}
            hover:bg-purple-100
          `}
          onClick={() => handleDateClick(cloneDay)}
        >
          {formattedDate}
        </div>
      )
      day = addDays(day, 1)
    }
    
    // Group days into weeks
    let daysInMonth = rows
    let weeksInMonth = []
    let week = []
    
    for (let i = 0; i < daysInMonth.length; i++) {
      if (i % 7 !== 0) {
        week.push(daysInMonth[i])
      } else {
        if (week.length > 0) {
          weeksInMonth.push(<div key={i} className="grid grid-cols-7 mb-1">{week}</div>)
        }
        week = [daysInMonth[i]]
      }
      
      if (i === daysInMonth.length - 1) {
        weeksInMonth.push(<div key={i} className="grid grid-cols-7 mb-1">{week}</div>)
      }
    }
    
    days.push(...weeksInMonth)
    return days
  }
  
  // Helper function to add days
  const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  return (
    <div className="w-full mb-8">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {/* Visible input with formatted date */}
        <div 
          className="relative w-full cursor-pointer"
          onClick={toggleCalendar}
        >
          <input
            ref={inputRef}
            type="text"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
            placeholder="gg.aa.yyyy"
            value={selectedDate ? formatDisplayDate(selectedDate) : ""}
            readOnly
            required={required}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Calendar size={20} />
          </div>
        </div>
        
        {/* Calendar popup */}
        {isOpen && (
          <div 
            ref={calendarRef}
            className="absolute left-0 top-full mt-1 z-50 bg-white shadow-lg rounded-lg p-4 border border-gray-200"
            style={{ width: '280px' }}
          >
            {/* Month navigation */}
            <div className="flex justify-between items-center mb-4">
              <button 
                type="button"
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <h2 className="text-sm font-medium text-gray-700">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <button 
                type="button"
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
            
            {/* Calendar grid */}
            <div className="calendar-grid">
              {renderDays()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    mail: "",
    dateOfBirth: "",
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
  
  // Special handler for date picker
  const handleDateChange = (name: string, value: string) => {
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
      dateOfBirth: formData.dateOfBirth || null,
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
              {/* Profile Picture */}
              <div className="animate-fade-in-up animation-delay-300 flex justify-center mb-4">
                <ImageUpload onImageUpload={handleImageUpload} previewUrl={previewUrl} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up animation-delay-400">
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

              <div className="animate-fade-in-up animation-delay-500">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up animation-delay-600">
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

              {/* Date of Birth - Calendar Picker */}
              <div className="animate-fade-in-up animation-delay-700">
                <CalendarDatePicker
                  id="dateOfBirth"
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  required
                />
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