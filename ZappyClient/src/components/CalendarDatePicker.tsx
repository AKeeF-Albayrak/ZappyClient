// src/components/CalendarDatePicker.tsx
import React, { useState, useRef, useEffect } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, parseISO, addDays } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface CalendarDatePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({ id, label, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? parseISO(value) : null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return "";
    return format(date, "dd.MM.yyyy");
  };

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    onChange(id, format(day, "yyyy-MM-dd"));
    setIsOpen(false);
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
    if (!isOpen && selectedDate) {
      setCurrentMonth(selectedDate);
    }
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let day = startDate;
    while (day <= endDate) {
      let formattedDate = format(day, "d");
      const cloneDay = day;
      rows.push(
        <div
          key={day.toString()}
          className={`w-8 h-8 flex items-center justify-center text-sm rounded-full cursor-pointer ${
            !isSameMonth(day, monthStart) ? "text-gray-300" : "text-gray-700"
          } ${isSameDay(day, new Date()) ? "bg-gray-100" : ""} ${
            selectedDate && isSameDay(day, selectedDate) ? "bg-purple-600 text-white" : ""
          } hover:bg-purple-100`}
          onClick={() => handleDateClick(cloneDay)}
        >
          {formattedDate}
        </div>
      );
      day = addDays(day, 1);
    }

    return rows;
  };

  return (
    <div className="w-full mb-8">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="relative w-full cursor-pointer" onClick={toggleCalendar}>
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
        {isOpen && (
          <div
            ref={calendarRef}
            className="absolute left-0 top-full mt-1 z-50 bg-white shadow-lg rounded-lg p-4 border border-gray-200"
            style={{ width: "280px" }}
          >
            <div className="flex justify-between items-center mb-4">
              <button type="button" onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <h2 className="text-sm font-medium text-gray-700">{format(currentMonth, "MMMM yyyy")}</h2>
              <button type="button" onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
            <div className="calendar-grid">{renderDays()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDatePicker;
