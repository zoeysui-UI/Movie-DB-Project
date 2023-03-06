import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Tabs from "./Tabs";
import Login from "./Login";
import { Routes, Route, Link } from "react-router-dom";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  background-color: lightblue;
`;

export default function Header(props) {
  return (
    <HeaderContainer>
      <Logo />
      <Tabs activeTab={props.activeTab} onTabClick={props.onTabClick} />
    </HeaderContainer>
  );
}
