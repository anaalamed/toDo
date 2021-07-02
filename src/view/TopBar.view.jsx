import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <Header>
      <SLink to="/">Home</SLink>
      <SLink to="/signin">Sign In</SLink>
      <SLink to="/todo">ToDo</SLink>
    </Header>
  );
};
export default TopBar;

const Header = styled.header`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  background: #d39c26;
  position: fixed;
  left: 0;
  right: 0;
  padding: 2rem;
  display: flex;
  align-items: center;
`;
const SLink = styled(Link)`
  color: #1114e7;
  font-size: large;
  font-weight: bold;
  text-decoration: none;
  margin-right: 2rem;
  :hover {
    text-decoration: underline;
    /* background: red; */
  }
`;
const Logo = styled.img`
  width: 3rem;
  cursor: pointer;
`;
