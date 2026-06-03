import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginRegister({ onLogin }) {
  const [loginName, setLoginName] = useState("");
  const [password, setPassWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [registerData, setRegisterData] = useState({
    login_name: "",
    password: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });
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
  const handleRegisterChange = (field, value) => {
    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleRegister = async () => {
    try {
      setRegisterMessage("");
      await fetchModel("/user", {
        method: "POST",
        body: JSON.stringify(registerData),
      });
      setRegisterMessage("Dang ki thanh cong");
    } catch (error) {
      setRegisterMessage(error.message);
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
        <Button onClick={handleLogin}>Login</Button>
      </div>
      <div>
        <Typography>Register</Typography>
        <TextField
          label="Login name"
          value={registerData.login_name}
          type="text"
          onChange={(e) => handleRegisterChange("login_name", e.target.value)}
        ></TextField>
        <TextField
          label="Password"
          value={registerData.password}
          type="password"
          onChange={(e) => handleRegisterChange("password", e.target.value)}
        ></TextField>
        <TextField
          label="First_name"
          value={registerData.first_name}
          type="text"
          onChange={(e) => handleRegisterChange("first_name", e.target.value)}
        ></TextField>
        <TextField
          label="Last_name"
          value={registerData.last_name}
          type="text"
          onChange={(e) => handleRegisterChange("last_name", e.target.value)}
        ></TextField>
        <TextField
          label="Location"
          value={registerData.location}
          type="text"
          onChange={(e) => handleRegisterChange("location", e.target.value)}
        ></TextField>
        <TextField
          label="Description"
          value={registerData.description}
          type="text"
          onChange={(e) => handleRegisterChange("description", e.target.value)}
        ></TextField>
        <TextField
          label="Occupation"
          value={registerData.occupation}
          type="text"
          onChange={(e) => handleRegisterChange("occupation", e.target.value)}
        ></TextField>
        <Button onClick={handleRegister}>Register me</Button>
        {registerMessage && <Typography>{registerMessage}</Typography>}
      </div>
    </>
  );
}
