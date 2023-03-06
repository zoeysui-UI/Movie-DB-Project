import React, { useState, useEffect, useMemo } from "react";
import client from "./client";
import { useHistory } from "react-router-dom";

export default function RateForm(props) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [inputValue, setInputValue] = useState("1");
  //const history = useHistory();

  const user = localStorage.getItem("user");
  const userParse = JSON.parse(user);
  //console.log("account_id: ", account_id);
  const session_id = userParse.sessionId;

  const handleChange = (event) => {
    setInputValue(event.target.value);
    //console.log(event.target.value);
    //console.log("RateForm handleChange");
  };

  //console.log(" props.movie_id,:", props.movieId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccess(true);
    //console.log("RateForm handleSubmit");
    if (!inputValue) {
      return;
    }
    //console.log("value:", inputValue);
    const data = { value: inputValue };
    const url = `/movie/${props.movieId}/rating`;
    try {
      const response = await client.post(url, data, {
        params: {
          session_id
        }
      });
      console.log("response.data:", response);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  const rates = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <select value={inputValue} onChange={handleChange}>
          {rates.map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </label>
      <input type="submit" value="Submit" />
      {showSuccess && <p>Success!</p>}
    </form>
  );
}
