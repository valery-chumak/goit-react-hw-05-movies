import React from 'react';
import { StyledLink, NavList } from './Navbar.styled';

export default function Navbar() {
  return (
    <NavList>
      <StyledLink to="/" end>
        Home
      </StyledLink>
      <StyledLink to="/movies">Movies</StyledLink>
    </NavList>
  );
}
