"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  format, addMonths, subMonths,
  startOfMonth, endOfMonth, startOfWeek,
  endOfWeek, isSameMonth, isSameDay,
  parseISO, addDays, getYear, getMonth, setMonth, setYear
} from "date-fns"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { createPortal } from "react-dom"

interface CalendarDatePickerProps {
  id: string
  label: string
  value: string
  onChange: (name: string, value: string) => void
  required?: boolean
}

type ViewMode = "days" | "months" | "years"

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({ id, label, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? parseISO(value) : null)
  const [isFocused, setIsFocused] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("days")
  const inputRef = useRef<HTMLInputElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const [popupStyle, setPopupStyle] = useState({ top: 0, left: 0 })

  const formatDisplayDate = (date: Date | null) => date ? format(date, "dd.MM.yyyy") : ""

  const handleDateClick = (day: Date) => {
    setSelectedDate(day)
    onChange(id, format(day, "yyyy-MM-dd"))
    setIsOpen(false)
    setIsFocused(false)
    setViewMode("days")
  }

  const toggleCalendar = () => {
    if (!isOpen && selectedDate) setCurrentDate(selectedDate)
    if (!isOpen && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setPopupStyle({
        top: rect.top + window.scrollY,
        left: rect.right + 12 + window.scrollX
      })
    }
    setIsOpen(!isOpen)
    setIsFocused(!isOpen)
    setViewMode("days")
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setIsFocused(false)
        setViewMode("days")
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const renderDayGrid = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })
    const rows = []
    const dayHeaders = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
    let day = startDate
    let days = []

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = isSameMonth(day, monthStart)
        const isToday = isSameDay(day, new Date())
        const isSelected = selectedDate && isSameDay(day, selectedDate)

        days.push(
          <button
            key={day.toString()}
            type="button"
            className={`w-10 h-10 flex items-center justify-center text-sm rounded-lg font-medium
              ${!isCurrentMonth ? "text-gray-300 hover:text-gray-400" : "text-gray-700"}
              ${isToday && !isSelected ? "bg-purple-100 text-purple-700 font-bold" : ""}
              ${isSelected ? "bg-purple-600 text-white font-bold shadow-lg scale-105" : ""}
              ${isCurrentMonth && !isSelected && !isToday ? "hover:bg-purple-50 hover:text-purple-600 hover:scale-105" : ""}`}
            onClick={() => handleDateClick(day)}
          >
            {format(day, "d")}
          </button>
        )
        day = addDays(day, 1)
      }
      rows.push(<div key={day.toString()} className="grid grid-cols-7 gap-1">{days}</div>)
      days = []
    }

    return (
      <div className="space-y-1">
        <div className="grid grid-cols-7 gap-1 mb-3">
          {dayHeaders.map((d) => (
            <div key={d} className="w-10 h-8 flex items-center justify-center text-xs font-bold text-purple-600 bg-purple-50 rounded-md">{d}</div>
          ))}
        </div>
        <div className="space-y-1">{rows}</div>
      </div>
    )
  }

  const renderMonthGrid = () => {
    const monthNames = Array.from({ length: 12 }, (_, i) => format(new Date(2025, i, 1), "MMM"))
    const currentYear = getYear(currentDate)
    const selectedYear = selectedDate ? getYear(selectedDate) : null
    const selectedMonth = selectedDate ? getMonth(selectedDate) : null

    return (
      <div className="grid grid-cols-3 gap-2">
        {monthNames.map((name, i) => {
          const isSelected = selectedYear === currentYear && selectedMonth === i
          return (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg text-sm font-medium
                ${isSelected ? "bg-purple-600 text-white" : "hover:bg-purple-50 text-gray-700"}`}
              onClick={() => {
                setCurrentDate(setMonth(currentDate, i))
                setViewMode("days")
              }}
            >
              {name}
            </button>
          )
        })}
      </div>
    )
  }

  const renderYearGrid = () => {
    const currentYear = getYear(currentDate)
    const start = Math.floor(currentYear / 10) * 10
    const selectedYear = selectedDate ? getYear(selectedDate) : null
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 12 }, (_, i) => start - 1 + i).map((y) => (
          <button
            key={y}
            className={`px-4 py-2 rounded-lg text-sm font-medium
              ${selectedYear === y ? "bg-purple-600 text-white" : y < start || y > start + 9 ? "text-gray-400" : "hover:bg-purple-50 text-gray-700"}`}
            onClick={() => {
              setCurrentDate(setYear(currentDate, y))
              setViewMode("months")
            }}
          >
            {y}
          </button>
        ))}
      </div>
    )
  }

  const hasValue = selectedDate !== null
  const isFloating = isFocused || hasValue

  const calendarPopup = (
    <div
      ref={popupRef}
      style={{ top: popupStyle.top, left: popupStyle.left, position: "absolute", zIndex: 9999 }}
      className="bg-white border rounded-xl p-4 w-[280px] max-h-[80vh] overflow-y-auto drop-shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            viewMode === "years"
              ? setCurrentDate(setYear(currentDate, getYear(currentDate) - 10))
              : setCurrentDate(viewMode === "months" ? setYear(currentDate, getYear(currentDate) - 1) : subMonths(currentDate, 1))
          }}
          className="p-2 rounded-xl hover:bg-purple-50 hover:text-purple-600 text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            setViewMode(viewMode === "days" ? "months" : viewMode === "months" ? "years" : "days")
          }}
          className="text-md font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent"
        >
          {viewMode === "days" && format(currentDate, "MMMM yyyy")}
          {viewMode === "months" && format(currentDate, "yyyy")}
          {viewMode === "years" && `${Math.floor(getYear(currentDate) / 10) * 10} - ${Math.floor(getYear(currentDate) / 10) * 10 + 9}`}
        </button>

        <button
          onClick={() => {
            viewMode === "years"
              ? setCurrentDate(setYear(currentDate, getYear(currentDate) + 10))
              : setCurrentDate(viewMode === "months" ? setYear(currentDate, getYear(currentDate) + 1) : addMonths(currentDate, 1))
          }}
          className="p-2 rounded-xl hover:bg-purple-50 hover:text-purple-600 text-gray-600"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {viewMode === "days" && renderDayGrid()}
      {viewMode === "months" && renderMonthGrid()}
      {viewMode === "years" && renderYearGrid()}

      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <button
          onClick={() => {
            const today = new Date()
            setSelectedDate(today)
            onChange(id, format(today, "yyyy-MM-dd"))
            setIsOpen(false)
            setIsFocused(false)
          }}
          className="px-3 py-1 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg font-medium"
        >
          Today
        </button>
        <button
          onClick={() => {
            setIsOpen(false)
            setIsFocused(false)
            setViewMode("days")
          }}
          className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
        >
          Close
        </button>
      </div>
    </div>
  )

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          id={id}
          className="w-full px-4 pt-6 pb-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ease-out cursor-pointer peer"
          placeholder=" "
          value={formatDisplayDate(selectedDate)}
          onClick={toggleCalendar}
          readOnly
          required={required}
        />
        <label htmlFor={id} className={`absolute text-gray-500 duration-300 transform transition-all ease-out pointer-events-none ${isFloating ? "text-xs top-2 left-4 scale-90" : "text-base top-1/2 left-4 -translate-y-1/2"} ${isFocused ? "text-purple-500" : "text-gray-500"}`}>{label}</label>
        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors" onClick={toggleCalendar}>
          <Calendar className="w-5 h-5" />
        </button>
      </div>
      {isOpen && createPortal(calendarPopup, document.body)}
    </div>
  )
}

export default CalendarDatePicker
