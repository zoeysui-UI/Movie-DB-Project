import React from "react";
import styled from "styled-components";
import Tab from "./Tab";
import { TABS } from "../contants";

const TabsContainer = styled.ul`
  display: flex;
`;

export default function Tabs(props) {
  const tabs = Object.values(TABS);
  return (
    <TabsContainer>
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab}
            active={props.activeTab === tab}
            onClick={() => props.onTabClick(tab)}
          >
            {tab}
          </Tab>
        );
      })}
    </TabsContainer>
  );
}
