import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`).then((data) => setPhotos(data));
  });
  return (
    <Typography variant="body1">
      {photos.map((photo) => (
        <div key={photo._id}>
          <img src={require(`/src/images/${photo.file_name}`)} />
          <p>Create at: {photo.date_time}</p>
          <h2>Comments :</h2>
          {(photo.comments || []).map((comment) => (
            <div key={comment._id}>
              <Link to={`/user/${comment.user._id}`}>
                {" "}
                <p>
                  {comment.user.first_name} {comment.user.last_name}
                </p>{" "}
              </Link>
              <p>Comment at : {comment.date_time}</p>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      ))}
    </Typography>
  );
}

export default UserPhotos;
