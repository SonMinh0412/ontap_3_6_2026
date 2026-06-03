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
function UserList({ loggedInUser }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (!loggedInUser) return;
    fetchModel("/user/list").then((data) => setUsers(data));
  }, [loggedInUser]);
  return (
    <div>
      {loggedInUser && (
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
      )}
    </div>
  );
}

export default UserList;
