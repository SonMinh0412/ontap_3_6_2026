import "./App.css";

import React from "react";
import { Grid, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";

const App = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedInUser(null);
  };

  const isAuthenticated = loggedInUser !== null;

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar loggedInUser={loggedInUser} onLogout={handleLogout} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList loggedInUser={loggedInUser} />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/user/:userId"
                  element={
                    isAuthenticated ? (
                      <UserDetail />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/photosOfUser/:userId"
                  element={
                    isAuthenticated ? (
                      <UserPhotos />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/user/list"
                  element={
                    isAuthenticated ? (
                      <UserList loggedInUser={loggedInUser} />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />

                <Route
                  path="/login"
                  element={
                    !isAuthenticated ? (
                      <LoginRegister onLogin={handleLogin} />
                    ) : (
                      <Navigate to={`/user/${loggedInUser._id}`} replace />
                    )
                  }
                />
                <Route
                  path="*"
                  element={
                    isAuthenticated ? (
                      <Navigate to={`/user/${loggedInUser._id}`} replace />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
