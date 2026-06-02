import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import { useLocation, matchPath, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import models from "../../modelData/models";
/**
 * Define TopBar, a React component of Project 4.
 */
function getUserName(userId) {
  const user = models.userModel(userId);
  return `${user.first_name} ${user.last_name}`;
}

function TopBar() {
  const path = useLocation().pathname;
  const [contentText, setContentText] = useState("");
  useEffect(() => {
    const userDetailMatch = matchPath("/users/:userId", path);
    const photosDetailMatch = matchPath("/photosOfUser/:userId", path);
    const match = userDetailMatch || photosDetailMatch;
    if (!match) {
      setContentText("");
      return;
    }
    setContentText(
      userDetailMatch
        ? getUserName(userDetailMatch.params.userId)
        : `Photos of ${getUserName(photosDetailMatch.params.userId)}`
    );
  });
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Hoang Minh Son B23DCKH100
        </Typography>
        <Typography variant="h5" color="inherit">
          {contentText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
