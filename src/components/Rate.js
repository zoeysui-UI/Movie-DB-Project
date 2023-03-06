import React, { useState, useEffect, useMemo } from "react";
import "../styles.css";
import styled from "styled-components";
import MovieCardList from "./MovieCardList";
import MovieDetails from "./MovieDetails";
import { CATEGORIES, TABS } from "../contants";
import { fetchMoviesByCategory } from "../api";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import client from "./client";
import RateMovieCard from "./RateMovieCard";

const LikeContainer = styled.div`
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;
`;
const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;

//derived value
export default function Rate() {
  const [movieRateList, setMovieRateList] = useState([]);

  const API_KEY = `d23c0c2d4e4286250cdab95e4dc48467`;

  const user = localStorage.getItem("user");

  let account_id = "";
  let session_id = "";

  if (user) {
    const userParse = JSON.parse(user);
    //console.log(userParse);
    account_id = userParse.accountId;
    session_id = userParse.sessionId;
    //console.log("account_id: ", session_id);
    const url = `https://api.themoviedb.org/3/account/${account_id}/rated/movies?api_key=${API_KEY}&language=en-US&session_id=${session_id}&sort_by=created_at.asc&page=1`;
    //console.log("url: ", url);

    // fetch("http://example.com/movies.json")
    // .then((response) => response.json())
    // .then((data) => console.log(data));

    useEffect(() => {
      //console.log("useEffect");
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          //console.log("dataResult:", data.results);
          setMovieRateList(data.results);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, []);
  }

  return (
    <LikeContainer>
      <MovieContainer>
        {!user
          ? "please login"
          : movieRateList.map((movie) => {
              return (
                <RateMovieCard key={movie.id} movie={movie} liked={false} />
              );
            })}
      </MovieContainer>
    </LikeContainer>
  );
}
