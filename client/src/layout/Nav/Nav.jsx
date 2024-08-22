import React from 'react';
import styled from 'styled-components';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Menu from '../../components/Menu.jsx';

const StyledNav = styled.nav`
  padding: 1.6rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
  position: absolute;

  background: transparent;
`;

const Navigation = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const NavigationButton = styled.div`
  height: 3.2rem;
  width: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.7);
  border-radius: 5rem;
  cursor: pointer;

  svg {
    color: #fff;
    font-size: 1.6rem;
  }
`;

const Avatar = styled.button`
  height: 3.2rem;
  width: 3.2rem;
  padding: 0.4rem;
  overflow: hidden;

  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5rem;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }

  img {
    height: 100%;
    border-radius: 5rem;
  }
`;

const Nav = () => {
  const { name, img } = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  return (
    <StyledNav>
      <Navigation>
        <NavigationButton role="button">
          <RiArrowLeftSLine onClick={() => navigate(-1)} />
        </NavigationButton>
        <NavigationButton role="button">
          <RiArrowRightSLine onClick={() => navigate(1)} />
        </NavigationButton>
      </Navigation>

      <Menu>
        <Menu.Open>
          <Avatar to="/profile">
            <img src={img} alt={name} />
          </Avatar>
        </Menu.Open>
        <Menu.Body>
          <Menu.Link to="">Account</Menu.Link>
          <Menu.Link to="profile" underline={true}>
            Profile
          </Menu.Link>
          <Menu.Link to="">Log out</Menu.Link>
        </Menu.Body>
      </Menu>
    </StyledNav>
  );
};

export default Nav;
