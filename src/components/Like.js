import React, { useState, useEffect, useMemo } from "react";
import "../styles.css";
import styled from "styled-components";
import Pagination from "./Pagination";
import MovieCardList from "./MovieCardList";
import Modal from "./Modal";
import MovieDetails from "./MovieDetails";
import { CATEGORIES, TABS } from "../contants";
import CategorySelector from "./CategorySelector";
import { fetchMoviesByCategory } from "../api";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import client from "./client";
import LikeMovieCard from "./LikeMovieCard";

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
export default function Like() {
  const [movieLikeList, setMovieLikeList] = useState([]);

  const API_KEY = `d23c0c2d4e4286250cdab95e4dc48467`;

  const user = localStorage.getItem("user");
  if (user) {
    const userParse = JSON.parse(user);
    const account_id = userParse.accountId;
    //console.log("account_id: ", account_id);
    const session_id = userParse.sessionId;
    const url = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`;
    console.log("url: ", url);

    // fetch("http://example.com/movies.json")
    // .then((response) => response.json())
    // .then((data) => console.log(data));

    useEffect(() => {
      console.log("useEffect");
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          console.log("dataResult:", data.results);
          setMovieLikeList(data.results);
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
          : movieLikeList.map((movie) => {
              return (
                <LikeMovieCard key={movie.id} movie={movie} liked={true} />
              );
            })}
      </MovieContainer>
    </LikeContainer>
  );
}

// function Form() {
//   function handleSubmit(e) {
//     e.preventDefault();    console.log('You clicked submit.');
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
//----------------------------------------------------------
// import React from "react";
// import styled from "styled-components";
// import MovieCard from "./MovieCard";

// // export default function MovieCardList(props) {
//   return (
//     <ListContainer>
//       {props.movieList.map((movie) => {
//         // const isLiked = props.likedMovieList.find((likedMovie) => {
//         //   return likedMovie.id === movie.id;
//         // });
//         const isLiked = props.likedMoviesMap[movie.id];
//         return (
//           <MovieCard
//             key={movie.id}
//             movie={movie}
//             liked={isLiked}
//             onToggleLike={props.onToggleLike}
//             onTitleClick={props.onTitleClick}
//           />
//         );
//       })}
//     </ListContainer>
//   );
// }
