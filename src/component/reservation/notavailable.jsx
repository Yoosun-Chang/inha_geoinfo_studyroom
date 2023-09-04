import React from 'react';
import styled from 'styled-components';
import SchoolLogoImage from './SchoolLogo.png';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  height: 50vh; 
`;

const LogoImage = styled.img`
  width: 10rem;
  height: 12em;
  flex-shrink: 0;
  margin-bottom: 1.5rem; 
`;

const CenteredText = styled.div`
  color: white;
  font-family: Nunito;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  background:linear-gradient(180deg, #0AF 0%, #78D2FF 100%);
  padding: 7px; 
  border-radius: 10px;
`;


function NotAvailable() {
  return (
    <CenteredContainer>
      <LogoImage src={SchoolLogoImage} alt="School Logo" />
      <CenteredText>
        예약이 불가능한 날짜입니다
        <br />
        다른 날짜를 선택해주세요
      </CenteredText>
    </CenteredContainer>
  );
}

export default NotAvailable;
