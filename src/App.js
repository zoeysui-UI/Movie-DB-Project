import React, { useState } from "react";
//import Header from "./components/Header";
import "./styles.css";
import styled from "styled-components";
import { TABS } from "./contants";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { Routes, Route, Link, BrowserRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Like from "./components/Like";
import Rate from "./components/Rate";
import Logo from "./components/Logo";
import MovieDetails from "./components/MovieDetails";

// const AppContainer = styled.div`
//   max-width: 1678px;
//   margin: 0 auto;
//   color: #555;
//   padding: 16px;
// `;

//derived value
export default function App() {
  // const [activeTab, setActiveTab] = useState(TABS.HOME);
  // const handleTabClick = (tab) => {
  //   console.log("tab:", tab);
  //   setActiveTab(tab);
  // };
  const routes = ["", "/liked", "/rated", "/login"];
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/">
          <AppBar>
            <Tabs>
              <Logo />
              <Tab
                label="Home"
                value={routes[0]}
                component={Link}
                to={routes[0]}
              />
              <Tab
                label="Like"
                value={routes[1]}
                component={Link}
                to={routes[1]}
              />
              <Tab
                label="Rate"
                value={routes[2]}
                component={Link}
                to={routes[2]}
              />
              <Tab
                label="Login"
                value={routes[3]}
                component={Link}
                to={routes[3]}
              />
            </Tabs>
          </AppBar>
        </Route>

        <Switch>
          <Route path="/liked" component={Like} />
          <Route path="/rated" component={Rate} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
          <Route path="/movie/:movie_id" component={MovieDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
