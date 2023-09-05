import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './sidebar';

const HeaderPosition = styled.div`
  display: flex;
  justify-content: flex-end; 
  align-items: center;
`;

const MenuBtn = styled.div`
  z-index: 10;
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 12px;
  font-size: 40px;
  color: white;
`;

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSide = () => {
    setIsOpen(!isOpen); // isOpen의 값을 토글합니다.
  };

  return (
    <HeaderPosition>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MenuBtn isOpen={isOpen} role="button" onClick={toggleSide}>
        ≡
      </MenuBtn>
    </HeaderPosition>
  );
}

export default Header;
