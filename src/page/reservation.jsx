import React, { useState } from 'react';
import styled from 'styled-components';
import Weekcal from '../component/reservation/weekcal';
import RoomBtn from '../component/reservation/roombtn';
import NotAvailable from '../component/reservation/notavailable';
import ConfirmButton from '../component/reservation/confirmbtn';

const Container = styled.div`
  text-align: center
`;

function Reservation() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (selectedDateString) => {
    setSelectedDate(selectedDateString);
  };

  function isToday(dateString) {
    const now = new Date();
    const today = now.getDate();
    const selectedDay = parseInt(dateString.split(' ')[2]);
    return selectedDay === today;
  }

  function isTomorrow(dateString) {
    const now = new Date();
    const today = now.getDate();
    const tomorrow = today + 1;
    const selectedDay = parseInt(dateString.split(' ')[2]);
    return selectedDay === tomorrow;
  }

  function isReservationAvailable(dateString) {
    const today = isToday(dateString);
    const tomorrow = isTomorrow(dateString);
    return today || tomorrow;
  }

  return (
    <div>
      <Weekcal onDateClick={handleDateClick} />
      {selectedDate && (
        <div>
          {isToday(selectedDate) && (
            <div>
              <Container>
                <RoomBtn />
              </Container>
            </div>
          )}
          {isTomorrow(selectedDate) && (
            <div>
              <Container>
                <RoomBtn />
              </Container>
            </div>
          )}
          {!isReservationAvailable(selectedDate) && (
            < NotAvailable />
          )}
          <div className="SelectedDate">
            {selectedDate}
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservation;
