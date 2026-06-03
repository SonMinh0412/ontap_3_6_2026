import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import "./styles.css";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React component of Project 4.
 */

function TopBar({ loggedInUser, onLogout }) {
  const path = useLocation().pathname;
  const [contentText, setContentText] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const handleAddPhoto = () => {
    fileInputRef.current.click();
  };
  const handlePhotoSelected = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);
    try {
      await fetchModel("/photos/new", {
        method: "POST",
        body: formData,
      });
      setUploadMessage("upload thanh cong");
      navigate(`/photosOfUser/${loggedInUser._id}?refresh=${Date.now()}`);
    } catch (error) {
      setUploadMessage(error.message);
    }
    e.target.value = "";
  };
  useEffect(() => {
    const userDetailMatch = matchPath("/user/:userId", path);
    const photosDetailMatch = matchPath("/photosOfUser/:userId", path);
    const match = userDetailMatch || photosDetailMatch;
    if (!match) {
      setContentText("");
      return;
    }
    fetchModel(`/user/${match.params.userId}`).then((user) => {
      const name = `${user.first_name} ${user.last_name}`;
      setContentText(userDetailMatch ? name : `Photos of ${name}`);
    });
  }, [path]);
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="inherit">
          Hoang Minh Son B23DCKH100
        </Typography>
        <Typography variant="h5" color="inherit">
          {contentText}
        </Typography>
        {loggedInUser ? (
          <>
            <Typography>Hi, {loggedInUser.first_name}</Typography>
            <Button onClick={onLogout} color="inherit">
              Logout
            </Button>
            <Button onClick={handleAddPhoto} color="inherit">
              Add photo
            </Button>
            <input
              type="file"
              accept="images/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handlePhotoSelected}
            ></input>
            {uploadMessage && <Typography>{uploadMessage}</Typography>}
          </>
        ) : (
          <Typography>Please Login</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
