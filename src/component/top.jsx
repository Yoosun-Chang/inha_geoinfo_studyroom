import React from "react";
import styled from "styled-components";
import TopImage from "./Top.jpg"; 

const ResponsiveImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: relative; 
  height: 10vh;
  max-height: 50px;
  width: 100vw;
  z-index: -10;
`;

const Text = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 4vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.05rem;
  position: absolute;
  color: #fff;
  left: 10px; 
`;

function Top() {
  return (
    <CenteredContainer>
      <ResponsiveImage src={TopImage} alt="Top Image" />
      <Text>INHA UNIVERSITY</Text>
    </CenteredContainer>
  );
}

export default Top;
