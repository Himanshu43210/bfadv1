import React, { useState } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CustomDatePicker = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const handleClickOutside = (event) => {
    if (event.target.id !== 'date-picker' && showCalendar) {
      setShowCalendar(false);
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelection = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setShowCalendar(false);
  };

  const getMonthDays = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth((currentMonth - 1 + 12) % 12); // Handle month overflow
  };

  const handleNextMonth = () => {
    setCurrentMonth((currentMonth + 1) % 12);
  };

  const renderCalendar = () => {
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInMonth = getMonthDays(currentMonth, currentYear);

    let calendarHTML = `<table><thead><tr>`;
    DAYS.forEach((day) => (calendarHTML += `<th>${day}</th>`));
    calendarHTML += `</tr></thead><tbody><tr>`;

    let blanks = firstDay;
    while (blanks > 0) {
      calendarHTML += `<td></td>`;
      blanks--;
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected =
        selectedDate.getDate() === i &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;
      calendarHTML += `<td class="<span class="math-inline">\{isSelected ? 'selected' \: ''\}" onClick\=\{\(\) \=\> handleDateSelection\(i\)\}\></span>{i}</td>`;
      if ((i + firstDay) % 7 === 0 && i !== daysInMonth) {
        calendarHTML += `</tr><tr>`;
      }
    }

    calendarHTML += `</tr></tbody></table>`;
    return calendarHTML;
  };

  return (
    <div id="date-picker" onClick={handleClickOutside}>
      <label htmlFor="date-input">Select Date</label>
      <input
        type="text"
        id="date-input"
        placeholder="Select Date"
        value={selectedDate.toLocaleDateString() || ''}
        readOnly
        style={{
          padding: '5px 10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      />
      <img
        src="calendar.png"
        alt="Calendar Icon"
        id="calendar-icon"
        onClick={toggleCalendar}
        style={{ width: '20px', cursor: 'pointer', margin: '0 5px' }}
      />
      {showCalendar && (
        <div
          id="calendar"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <button onClick={handlePrevMonth}>&#8592;</button>
            <span>
              {new Date(currentYear, currentMonth, 1).toLocaleDateString(
                'default',
                { month: 'long' }
              )}{' '}
              {currentYear}
            </span>
            <button onClick={handleNextMonth}>&#8594;</button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: renderCalendar() }} />
        </div>
      )}
    </div>
  );
};
export default CustomDatePicker;
