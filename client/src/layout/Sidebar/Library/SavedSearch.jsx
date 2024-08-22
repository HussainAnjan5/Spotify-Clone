import React, { useState } from 'react';
import styled from 'styled-components';
import { RiSearchLine } from 'react-icons/ri';
import useOutsideClick from '../../../hooks/useOutsideClick.js';

const StyledSearch = styled.div`
  padding: 0 0.8rem;
  margin-bottom: 0.8rem;
  position: relative;

  & > svg {
    left: 0.8rem;
  }

  &.active {
    button {
      z-index: -1;
    }

    input {
      width: 100%;
      padding-left: 3.2rem;
      opacity: 1;
    }
  }
`;

const Button = styled.button`
  height: 3.2rem;
  width: 3.2rem;

  position: absolute;
  left: 0.8rem;

  color: #fff;
  background: transparent;
  border: 0;
  border-radius: 5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    top: 0;
  }
`;

const Icon = styled(RiSearchLine)`
  height: 3.2rem;
  width: 3.2rem;
  padding: 0.8rem;

  position: absolute;
  left: 0;

  color: rgba(255, 255, 255, 0.7);
  font-size: 1.6rem;
`;

const Input = styled.input`
  width: 0;
  height: 32px;
  padding: 0.4rem 1.4rem;

  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
  border: 0;
  border-radius: 4px;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

const SavedSearch = ({ query, onChangeQuery, onClearQuery }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSearch = () => {
    setIsOpen(false);
    onClearQuery();
  };
  const { ref } = useOutsideClick(handleCloseSearch);

  return (
    <StyledSearch ref={ref} className={isOpen ? 'active' : ''}>
      <Input
        type="text"
        placeholder="Search in your Library"
        value={query}
        onChange={onChangeQuery}
      />
      <Icon />
      <Button onClick={() => setIsOpen(true)}>
        <Icon />
      </Button>
    </StyledSearch>
  );
};

export default SavedSearch;
