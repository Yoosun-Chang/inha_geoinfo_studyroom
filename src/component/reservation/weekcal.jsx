import React, { useState } from 'react';
import './weekcal.scss'; // 주어진 CSS 파일을 불러옵니다.

function Weekcal({ onDateClick }) {
  const now = new Date();
  const todayWeak = now.getDay();
  const today = now.getDate();
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  const getAlldate = (today, lastday) => {
    let dates = [];

    dates[0] = today;
    for (let i = 1; i <= 6; i++) {
      today++;
      if (today > lastday) {
        today = 1;
        dates[i] = today;
      } else {
        dates[i] = today;
      }
    }

    return dates;
  };

  const getAllweak = (todayWeak) => {
    let strWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weaklist = [];

    weaklist[0] = strWeak[todayWeak];

    for (let i = 1; i <= 6; i++) {
      todayWeak++;
      if (todayWeak > 6) {
        todayWeak = 0;
        weaklist[i] = strWeak[todayWeak];
      } else {
        weaklist[i] = strWeak[todayWeak];
      }
    }

    return weaklist;
  };

  const CalendarDay = getAlldate(today, lastday);
  const CalendarWeak = getAllweak(todayWeak);

  const CalendarObject = CalendarDay.map((day, index) => ({
    weak: CalendarWeak[index],
    day,
  }));

  // 선택한 날짜와 요일을 상태로 관리합니다.
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (day, weak) => {
    const selectedDateString = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${day}일 (${weak})`;
    
    // 상위 컴포넌트로 클릭된 날짜를 전달
    onDateClick(selectedDateString);
    setSelectedDate(selectedDateString);
  };

  return (
    <div className="Calendar">
      <div className="Year-MonthList">
        <p>
          <span className="Month">
            예약하기
          </span>
        </p>
      </div>
      <div className="DayList">
        {CalendarObject.map((calendar, index) => (
          <div
            key={index}
            className={`daylistSector ${
              calendar.day === today ? 'today' : ''
            }`}
            onClick={() => handleDateClick(calendar.day, calendar.weak)}
          >
            <div
              className={`weak ${calendar.weak === 'Sun' ? 'Sun' : ''} ${
                calendar.weak === 'Sat' ? 'Sat' : ''
              }`}
            >
              {calendar.weak}
            </div>
            <div className="day">{calendar.day}</div>
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="SelectedDate">
          {selectedDate}
        </div>
      )}
    </div>
  );
}

export default Weekcal;
