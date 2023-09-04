import React from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const ConfirmButtonContainer = styled.div`
  width: 150px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #0089FF;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: bold;
  user-select: none;
  transition: background-color 0.2s ease-in-out;
  text-align: center; 
  line-height: 50px; 
`;


function ConfirmButton() {
  return (
    <CenteredContainer>
      <ConfirmButtonContainer>
        예약확정
      </ConfirmButtonContainer>
    </CenteredContainer>
  );
}

export default ConfirmButton;
