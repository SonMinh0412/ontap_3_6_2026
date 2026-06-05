import React from "react";
import { Typography, TextField, Button } from "@mui/material";

import "./styles.css";
import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos({ loggedInUser }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [newComments, setNewComments] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const location = useLocation();
  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`).then((data) => setPhotos(data));
  }, [userId, location.search]);
  const handleAddComment = async (photoId) => {
    const comment = newComments[photoId];
    try {
      const data = await fetchModel(`/commentsOfPhoto/${photoId}`, {
        method: "POST",
        body: JSON.stringify({ comment }),
      });
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId
            ? {
                ...photo,
                comments: [...(photo.comments || []), data],
              }
            : photo
        )
      );
      setNewComments((prev) => ({
        ...prev,
        [photoId]: "",
      }));
      setErrorMessage((prev) => ({
        ...prev,
        [photoId]: "",
      }));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Typography variant="body1">
      {photos.map((photo) => (
        <div key={photo._id}>
          <img src={`https://8f7h4w-8081.csb.app/images/${photo.file_name}`} />
          <p>Create at: {new Date(photo.date_time).toLocaleString()}</p>
          <h2>Comments :</h2>
          <TextField
            label="Add comment"
            multiline
            fullWidth
            minRows={2}
            value={newComments[photo._id]}
            onChange={(e) =>
              setNewComments((prev) => ({
                ...prev,
                [photo._id]: e.target.value,
              }))
            }
          />
          <Button onClick={() => handleAddComment(photo._id)}>
            Add Comment
          </Button>
          {(photo.comments || []).map((comment) => (
            <div key={comment._id}>
              <Link to={`/user/${comment.user._id}`}>
                {" "}
                <p>
                  {comment.user.first_name} {comment.user.last_name}
                </p>{" "}
              </Link>
              <p>Comment at : {new Date(comment.date_time).toLocaleString()}</p>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      ))}
    </Typography>
  );
}

export default UserPhotos;
