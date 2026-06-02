import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchModel("/user/list").then((data) => setUsers(data));
  }, []);
  return (
    <div>
      <Typography variant="body1">
        This is the user list, which takes up 3/12 of the window. You might
        choose to use <a href="https://mui.com/components/lists/">Lists</a> and{" "}
        <a href="https://mui.com/components/dividers/">Dividers</a> to display
        your users like so:
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <>
            <ListItem component={Link} to={`/user/${item._id}`}>
              <ListItemText primary={item.first_name} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
      <Typography variant="body1">
        The model comes in from models.userListModel()
      </Typography>
    </div>
  );
}

export default UserList;
