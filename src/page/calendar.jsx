import React, { useState } from 'react';
import './calendar.css';
import styled from 'styled-components';

function Calendar() {
  const [date, setDate] = useState(new Date());

  const nowYear = date.getFullYear();
  const nowMon = date.getMonth() + 1;

  const bfBtn = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const atBtn = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const handleDateClick = (day) => {
    // 클릭한 날짜에 대한 처리를 여기에 추가
    console.log(`Clicked on day ${day}`);
  };

  function renderCalendar() {
    const daysInMonth = new Date(nowYear, nowMon, 0).getDate(); // 해당 월의 일 수
    const firstDay = new Date(nowYear, nowMon - 1, 1).getDay(); // 첫째 날의 요일 (0부터 6까지)

    const calendarRows = [];
    let calendarRow = [];

    // 첫째 날 이전의 빈 칸 생성
    for (let i = 0; i < firstDay; i++) {
      calendarRow.push(<td key={`empty-${i}`}></td>);
    }

    // 달력의 날짜 채우기
    for (let day = 1; day <= daysInMonth; day++) {
      calendarRow.push(
        <td key={day}>
          <button onClick={() => handleDateClick(day)}>{day}</button>
        </td>
      );

      if ((firstDay + day - 1) % 7 === 6) {
        calendarRows.push(<tr key={calendarRows.length}>{calendarRow}</tr>);
        calendarRow = [];
      }
    }

    // 나머지 빈 칸 채우기
    if (calendarRow.length > 0) {
      calendarRows.push(<tr key={calendarRows.length}>{calendarRow}</tr>);
    }

    return calendarRows;
  }

  const Container = styled.div`
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    background: #0089FF;
    border: none;
    font-size: 20px;
    padding: 15px;
  `;

  return (
    <div>
      <Container>
        <div id="btn">
          <input type="button" onClick={bfBtn} value="<" />
        </div>
        <caption>{`${nowYear}년 ${nowMon}월`}</caption>
        <div id="btn">
          <input type="button" onClick={atBtn} value=">" />
        </div>
      </Container>
      <table>
        <thead>
          <tr>
            <th>SUN</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>TRI</th>
            <th>SAT</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
}

export default Calendar;
