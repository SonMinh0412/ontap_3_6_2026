import React from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { useState, useEffect } from "react";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchModel(`/user/${userId}`).then((data) => setUser(data));
  }, [userId]);
  if (!user) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <>
      <Typography variant="body1">
        This should be the UserDetail view of the PhotoShare app. Since it is
        invoked from React Router the params from the route will be in property
        match. So this should show details of user: {user.userId}. You can fetch
        the model for the user from models.userModel.
      </Typography>
      <Typography variant="body1">
        <p>
          {" "}
          {user.first_name} {user.last_name}
        </p>
        <p> Location : {user.location}</p>
        <p> Description : {user.description}</p>
        <p> Occupation : {user.occupation}</p>
        <Link to={`/photosOfUser/${user._id}`}>
          <p>View photos</p>
        </Link>
      </Typography>
    </>
  );
}

export default UserDetail;
