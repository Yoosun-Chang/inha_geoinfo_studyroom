import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Weekcal from "../component/reservation/weekcal";
import RoomBtn from "../component/reservation/roombtn";
import NotAvailable from "../component/reservation/notavailable";
import ConfirmButton from "../component/reservation/confirmbtn";
import Header from "../component/sidemenu/header";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  text-align: center;
`;

const HeaderAndWeekcalContainer = styled.div`
  position: relative;
`;

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;

function Reservation() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isTomorrowButtonEnabled, setIsTomorrowButtonEnabled] = useState(false);
  const navigate = useNavigate();

  // 페이지 로딩 시 로컬 스토리지에서 schoolNumber와 name 확인
  useEffect(() => {
    const schoolNumber = localStorage.getItem("schoolnumber");
    const name = localStorage.getItem("Name");

    // schoolNumber와 name이 없을 때 /main 페이지로 이동
    // 왜 푸시 안되니 푸시 푸시 해줘
    if (!schoolNumber || !name) {
      navigate("/main");
    }
  }, [navigate]);

  const handleDateClick = (selectedDateString) => {
    setSelectedDate(selectedDateString);
  };

  useEffect(() => {
    // 현재 시간을 얻습니다.
    const now = new Date();
    const currentHour = now.getHours();

    // 현재 시간이 21시 이후인지 확인합니다.
    const isAfter21Hours = currentHour >= 21;

    // 21시 이후이면 내일 버튼을 활성화합니다.
    setIsTomorrowButtonEnabled(isAfter21Hours);
  }, []);

  function isToday(dateString) {
    const now = new Date();
    const today = now.getDate();
    const selectedDay = parseInt(dateString.split(" ")[2]);
    return selectedDay === today;
  }

  function isTomorrow(dateString) {
    const now = new Date();
    const today = now.getDate();
    const tomorrow = today + 1;
    const selectedDay = parseInt(dateString.split(" ")[2]);
    return selectedDay === tomorrow;
  }

  function isReservationAvailable(dateString) {
    const today = isToday(dateString);
    const tomorrow = isTomorrow(dateString);
    return today || (isTomorrowButtonEnabled && tomorrow);
  }

  return (
    <div>
      <HeaderAndWeekcalContainer>
        <HeaderOverlay>
          <Header />
        </HeaderOverlay>
        <Weekcal onDateClick={handleDateClick}></Weekcal>
      </HeaderAndWeekcalContainer>
      {selectedDate && (
        <div>
          {isToday(selectedDate) && (
            <div>
              <Container>
                <RoomBtn />
              </Container>
            </div>
          )}
          {isTomorrow(selectedDate) && isTomorrowButtonEnabled && (
            <div>
              <Container>
                <RoomBtn />
              </Container>
            </div>
          )}
          {!isReservationAvailable(selectedDate) && <NotAvailable />}
          <div className="SelectedDate">{selectedDate}</div>
        </div>
      )}
    </div>
  );
}

export default Reservation;
