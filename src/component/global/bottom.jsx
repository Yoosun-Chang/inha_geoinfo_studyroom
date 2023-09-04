import React from 'react';
import styled from 'styled-components';
import bottomVideo from './Bottom2.mp4'; 

const ResponsiveVideo = styled.video`
  max-width: 100%;
  height: auto;
  border:10px solid white;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 100%; /* 화면 높이에 맞추기 위해 max-height로 변경 */
  width: 100%;
  z-index: 100;
`;


const Text = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  color: #FFF;
  left: 0.5rem;
  top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  white-space: pre-wrap;
`;

function Bottom() {
  return (
    <CenteredContainer>
      <ResponsiveVideo autoPlay loop muted>
        <source src={bottomVideo} type="video/mp4" />
      </ResponsiveVideo>
      <Text>
        Developed By 19 홍진욱, 20 장유선, 20 최효리<br />
        Contact @inha_gonggan Copyright © geoinformatic All Rights Reserved.
      </Text>
    </CenteredContainer>
  );
}

export default Bottom;