import React from 'react';
import styled from 'styled-components';
import bottomImage from './Bottom.jpg'; // 이미지 파일 경로를 적절히 수정하세요

// 반응형 이미지 스타일 컴포넌트
const ResponsiveImage = styled.img`
  max-width: 100%;
  height: auto;
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
  height: 10vh;
  max-height: 50px;
  width: 100vw;
  z-index: 100;
`;

const Text = styled.div`
  font-family: 'Nunito', sans-serif;
  font-size: .5rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  color: #FFF;
  left: 10px;
  top: 10px; /* 위에 약간의 여백 추가 */

  /* 세로 정렬을 위해 추가 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  white-space: pre-wrap;
`;



function Bottom() {
  return (
    <CenteredContainer>
      <ResponsiveImage src={bottomImage} alt="Bottom Image" />
      <Text>
        Developed By 19 홍진욱, 20 장유선<br />
        Contact @inha_gonggan Copyright © geoinformatic All Rights Reserved.
      </Text>
    </CenteredContainer>
  );
}

export default Bottom;
