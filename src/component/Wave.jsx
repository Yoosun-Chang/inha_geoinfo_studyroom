import React from "react";
import styled from "styled-components";
import bottomImage from "./Bottom.jpg";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 100%;
  width: 100%;
  z-index: 100;
  height: 23vh;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const Text = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 0.7rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  position: absolute;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1000;
`;

function Bottom() {
  return (
    <CenteredContainer>
      <Image src={bottomImage} alt="Bottom Image" />
      <Text>
        Developed By 19 홍진욱, 20 장유선, 20 최효리
        <br />
        Contact @inha_gonggan Copyright © geoinformatic All Rights Reserved.
      </Text>
    </CenteredContainer>
  );
}

export default Bottom;
