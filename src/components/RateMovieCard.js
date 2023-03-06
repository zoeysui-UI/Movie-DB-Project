import React from "react";
import styled from "styled-components";
import { getImgFullUrl } from "../helpers";

const MovieCardContainer = styled.div`
  text-align: center;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);
  .movie-card-img img {
    width: 100%;
  }

  .movie-card-title {
    font-size: 1.2rem;
    margin: 1rem 0;
    cursor: pointer;
  }
  .movie-card-title: {
    color: #90cea1;
  }

  .movie-card-rating {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: center;
  }

  .movie-card-rating .icon {
    font-size: 1.5rem;
  }

  .movie-card-rating .rating {
    display: flex;
    align-items: center;
  }

  .movie-card-rating .icon.ion-md-heart-empty {
    cursor: pointer;
  }
  .movie-card-rating .icon.ion-md-heart {
    cursor: pointer;
    color: red;
  }

  .movie-card-rating .icon.rating-icon {
    color: #f5c518;
    margin-right: 0.5rem;
    cursor: default;
  }
`;

export default function RateMovieCard({ movie, liked }) {
  return (
    <MovieCardContainer>
      <div className="movie-card-img">
        <img src={getImgFullUrl(movie.poster_path)} />
      </div>
      <h4 className="movie-card-title">{movie.title}</h4>
      <div className="movie-card-rating">
        <div className="rating">
          <i className="icon ion-md-star rating-icon"></i>
          <span>
            {movie.vote_average}/{movie.rating}
          </span>
        </div>
        <div>
          <i
            className={`like-icon icon ${
              liked ? "ion-md-heart" : "ion-md-heart-empty"
            }`}
          ></i>
        </div>
      </div>
    </MovieCardContainer>
  );
}
