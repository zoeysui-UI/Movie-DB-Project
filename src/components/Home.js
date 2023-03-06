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
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Switch,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import client from "./client";

const AppContainer = styled.div`
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;
`;

//derived value
export default function Home() {
  let { path, url } = useRouteMatch();
  const [movieList, setMovieList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [ratedList, setRatedList] = useState([]);
  const [activeTab, setActiveTab] = useState(TABS.HOME);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [currentCategory, setCurrentCategory] = useState(
    CATEGORIES.NOW_PLAYING.value
  );

  const [activeMovieId, setActiveMovieId] = useState(null);
  //console.log("localstorage:", localStorage.valueOf());
  const user = localStorage.getItem("user");
  //console.log("user:", user);
  let account_id = "";
  if (user) {
    const userParse = JSON.parse(user);
    //console.log("userParse:", userParse);
    account_id = userParse.accountId;
    //console.log("account_id: ", account_id);
  }

  const likedMoviesMap = useMemo(() => {
    return likedList.reduce((acc, likedMovie) => {
      acc[likedMovie.id] = likedMovie;
      return acc;
    }, {});
  }, [likedList]);

  // const likedMoviesMap = likedList.reduce((acc, likedMovie) => {
  //   acc[likedMovie.id] = likedMovie;
  //   return acc;
  // }, {});

  /*
  const likedMoviesMap = useMemo(() => {
    return likedList.reduce((acc, likedMovie) => {
      acc[likedMovie.id] = likedMovie;
      return acc;
    }, {});
  }, [likedList]);
  */

  // const handleTabClick = (tab) => {
  //   console.log("tab:", tab);
  //   setActiveTab(tab);
  // };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const handleToggleLike = async (movie) => {
    if (!account_id) {
      return;
    }
    const hasLiked = likedMoviesMap[movie.id];

    if (hasLiked) {
      setLikedList(
        likedList.filter((likedMovie) => {
          return likedMovie.id !== movie.id;
        })
      );
    } else {
      setLikedList([...likedList, movie]);
    }

    try {
      await client.post(`/account/${account_id}/favorite`, {
        media_type: movie,
        media_id: movie.id,
        favorite: true
      });
    } catch (error) {
      console.log("e: ", error);
    }

    // const hasLiked = likedMoviesMap[movie.id];

    // if (hasLiked) {
    //   setLikedList(
    //     likedList.filter((likedMovie) => {
    //       return likedMovie.id !== movie.id;
    //     })
    //   );
    // } else {
    //   setLikedList([...likedList, movie]);
    // }
  };

  useEffect(() => {
    fetchMoviesByCategory(currentCategory, currentPage).then((data) => {
      setMovieList(data.results);
      setTotalPages(data.total_pages);
    });
  }, [currentCategory, currentPage]);

  const handleClickPrev = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const handleClickNext = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  const history = useHistory();
  const handleMovieTitleClick = (movieId) => {
    setActiveMovieId(movieId);
    console.log(movieId);
    history.push(`/movie/${movieId}`);
  };

  const handleModalClose = () => {
    setActiveMovieId(null);
  };

  //const isHomeTab = activeTab === TABS.HOME;

  const currentMovieList = movieList;
  // console.log("path:", path);
  // console.log("url: ", url);
  return (
    <AppContainer>
      {/* <Header activeTab={activeTab} onTabClick={handleTabClick} /> */}

      <Pagination
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <CategorySelector
        category={currentCategory}
        onChange={handleCategoryChange}
      />

      <MovieCardList
        movieList={currentMovieList}
        likedMovieList={likedList}
        likedMoviesMap={likedMoviesMap}
        onToggleLike={handleToggleLike}
        onTitleClick={handleMovieTitleClick}
      />
      {activeMovieId && (
        // <Link to={`/movie/${activeMovieId}`}>
        <Modal onClose={handleModalClose}>
          <MovieDetails movieId={activeMovieId} />
        </Modal>
        // </Link>
      )}
    </AppContainer>
  );
}

// import React, { useState, useEffect, useMemo } from "react";
// export default function Home() {
//   return <h1 style={{ marginTop: "15vh" }}>Home</h1>;
// }
