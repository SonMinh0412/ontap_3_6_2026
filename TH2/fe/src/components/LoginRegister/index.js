import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginRegister({ onLogin }) {
  const [loginName, setLoginName] = useState("");
  const [password, setPassWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      setErrorMessage("");
      const data = await fetchModel("/admin/login", {
        method: "POST",
        body: JSON.stringify({
          login_name: loginName,
          password: password,
        }),
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div>
        <Typography>Please login </Typography>
        <TextField
          label="Login name"
          value={loginName}
          type="text"
          onChange={(e) => setLoginName(e.target.value)}
        ></TextField>
        <TextField
          label="Password"
          value={password}
          type="password"
          onChange={(e) => setPassWord(e.target.value)}
        ></TextField>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Button onClick={handleLogin}>Login me </Button>
      </div>
    </>
  );
}
