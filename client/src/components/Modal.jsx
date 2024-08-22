import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { RiCloseLine } from 'react-icons/ri';
import useOutsideClick from '../hooks/useOutsideClick.js';

// Styled Components
const Overlay = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0 0;
  z-index: 9999;

  background-color: rgba(0, 0, 0, 0.5);
`;

const Body = styled.div`
  width: 52.4rem;
  padding: 2.4rem;
  position: relative;

  color: #fff;
  background-color: #282828;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  font-size: 2.4rem;
  font-weight: 600;
`;

const Button = styled.button`
  height: 3.2rem;
  width: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;

  background: transparent;
  border-radius: 5rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CloseButton = styled(RiCloseLine)`
  font-size: 2.4rem;
  color: rgba(255, 255, 255, 0.7);
`;

// Compound Component
const ModalContext = createContext(null);

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState('');

  const open = (name) => setOpenName(name);
  const close = () => setOpenName('');

  return (
    <ModalContext.Provider
      value={{
        openName,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ name, isDisabled = false, children }) => {
  const { openName, open, close } = useContext(ModalContext);

  const handleOpen = (e) => {
    if (isDisabled) return;

    e.stopPropagation();
    openName === '' || openName !== name ? open(name) : close();
  };

  return cloneElement(children, { onClick: (e) => handleOpen(e) });
};

const Window = ({ name, children }) => {
  const { openName, close } = useContext(ModalContext);
  const { ref } = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <Body ref={ref}>
        <Title>Edit Details</Title>
        <Button onClick={close}>
          <CloseButton role="button" />
        </Button>

        {children}
      </Body>
    </Overlay>,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
