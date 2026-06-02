import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import {useParams, Link} from "react-router-dom";
import models from "../../modelData/models"
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const {userId} = useParams();
    const user = models.userModel(userId);
    const photos = models.photoOfUserModel(userId)
    return (
      <Typography variant="body1">
        This should be the UserPhotos view of the PhotoShare app. Since it is
        invoked from React Router the params from the route will be in property
        match. So this should show details of user:
        {user.userId}. You can fetch the model for the user
        from models.photoOfUserModel(userId):
        {photos.map((photo) => (
          <div key = {photo._id}>
            <img src = {require(`/src/images/${photo.file_name}`)}/>
            <p>Create at: {photo.date_time}</p>
            <h2>Comments :</h2>
            {(photo.comments || []).map((comment) => (
              <div key = {comment._id}>
                <Link to = {`/users/${comment.user._id}`}> <p>{comment.user.first_name} {comment.user.last_name}</p> </Link>
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
