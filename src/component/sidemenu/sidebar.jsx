import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const SideBarWrap = styled.div`
  z-index: 15;
  border-radius: 15px 0 0 15px;
  background: linear-gradient(180deg, #FFF 0%, #78D2FF 100%);
  height: 100%;
  width: 50%;
  right: -50%;
  top: 0;
  position: fixed;
  transition: 0.5s ease;
  
  &.open {
    right: 0;
    transition: 0.5s ease;
  }
`;

const Menu = styled.div`
  margin: 40px 10px;
  color: #000;
    font-family: Nunito;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.6px;
`;

function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handlerOutsie);
    return () => {
      document.removeEventListener('mousedown', handlerOutsie);
    };
  }, []);

  const handlerOutsie = (e) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  return (
    <SideBarWrap id="sidebar" ref={outside} className={isOpen ? 'open' : ''}>
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          fontSize: '24px',
          cursor: 'pointer',
          color:'#0089FF'
        }}
        onClick={toggleSide}
      >
        
      </div>
      <ul>
        <Menu>12201321 장유선</Menu>
        <Menu>예약확인</Menu>
        <Menu>로그아웃</Menu>
      </ul>
    </SideBarWrap>
  );
}

export default Sidebar;
