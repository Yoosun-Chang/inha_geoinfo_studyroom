import React, { useState } from "react";
import "./weekcal.scss"; // 주어진 CSS 파일을 불러옵니다.

function Weekcal({ onDateClick }) {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // 현재 시간을 00:00:00으로 설정
  const todayWeak = now.getDay(); // 오늘의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const today = now.getDate(); // 오늘의 날짜
  const lastday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(); // 현재 월의 마지막 날짜

  // 시작 요일을 항상 월요일로 설정
  const startingDay = 1; // 월요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)

  // 오늘을 기준으로 해당 주의 첫 번째 날짜를 계산
  const firstDateOfTheWeek = new Date(now);
  const difference = todayWeak - startingDay;
  firstDateOfTheWeek.setDate(today - difference);

  // 해당 주의 마지막 날짜를 계산
  const lastDateOfTheWeek = new Date(firstDateOfTheWeek);
  lastDateOfTheWeek.setDate(firstDateOfTheWeek.getDate() + 6);

  // 해당 주의 날짜와 요일을 배열에 저장
  const CalendarObject = [];
  for (let i = 0; i <= 6; i++) {
    const date = new Date(firstDateOfTheWeek);
    date.setDate(firstDateOfTheWeek.getDate() + i);
    CalendarObject.push({
      weak: date.toLocaleDateString("en-US", { weekday: "short" }), // 요일을 "Mon", "Tue", ... 형식으로 표시
      day: date.getDate(),
    });
  }

  // 선택한 날짜와 요일을 상태로 관리합니다.
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (day, weak) => {
    const selectedDateString = `${now.getFullYear()}년 ${
      now.getMonth() + 1
    }월 ${day}일 (${weak})`;

    // 클릭 상태를 토글합니다.
    setClicked(!clicked);

    // 상위 컴포넌트로 클릭된 날짜를 전달
    onDateClick(selectedDateString);
    setSelectedDate(selectedDateString);
    localStorage.setItem("Year", now.getFullYear());
    localStorage.setItem("Month", now.getMonth() + 1);
    localStorage.setItem("Day", day);
  };

  // 선재 작업 내용
  const [clicked, setClicked] = useState(false);

  return (
    <div className="Calendar">
      <div className="Year-MonthList">
        <p>
          <span className="Month">예약하기</span>
        </p>
      </div>
      <div className="DayList">
        {CalendarObject.map((calendar, index) => (
          <div
            key={index}
            className={`daylistSector ${
              calendar.day === today ? "today" : ""
            } ${
              selectedDate ===
              `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${
                calendar.day
              }일 (${calendar.weak})`
                ? "clicked"
                : ""
            }`}
            onClick={() => handleDateClick(calendar.day, calendar.weak)}
          >
            <div
              className={`weak ${calendar.weak === "Sun" ? "Sun" : ""} ${
                calendar.weak === "Sat" ? "Sat" : ""
              }`}
            >
              {calendar.weak}
            </div>
            <div className="day">{calendar.day}</div>
          </div>
        ))}
      </div>
      {selectedDate && <div className="SelectedDate">{selectedDate}</div>}
    </div>
  );
}

export default Weekcal;
