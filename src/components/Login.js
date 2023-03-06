import React, { useState } from "react";
import client from "./client";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  // console.log("client:", client);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }
    try {
      setLoading(true);
      const {
        data: { request_token }
      } = await client.get("/authentication/token/new");
      console.log("request_token: ", request_token);
      await client.post("/authentication/token/validate_with_login", {
        username,
        password,
        request_token
      });
      const {
        data: { session_id }
      } = await client.post(`/authentication/session/new`, { request_token });
      console.log("session_id: ", session_id);
      client.defaults.params = { ...client.defaults.params, session_id };
      const { data } = await client.get("/account");
      console.log("data: ", data);
      const userData = {
        username,
        accountId: data.id,
        sessionId: session_id,
        requestToken: request_token
      };
      console.log("userData: ", userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userDataobj", userData);
      setLoading(false);
      history.push(`/`);
    } catch (e) {
      console.log("e: ", e);
      setError("Failed to login. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{loading ? "Logging in..." : "Login"}</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
