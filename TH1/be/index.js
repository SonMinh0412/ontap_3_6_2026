const express = require("express");
const app = express();
const cors = require("cors");
const {
  userListModel,
  userModel,
  photoOfUserModel,
  schemaInfo,
} = require("./modelData/photoApp");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  console.log("Hello");
});

app.get("/test/info", (req, res) => {
  try {
    const info = schemaInfo();
    if (!info) {
      return res.status(400).json("Cannot get schemaInfo");
    }
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json("Failed to fetch schemaInfo");
  }
});

app.get("/users/list", (req, res) => {
  try {
    const users = userListModel();
    if (!users) {
      return res.status(400).json("Not user found");
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Loi server");
  }
});

app.get("/users/:id", (req, res) => {
  try {
    const userId = req.params.id;
    const user = userModel(userId);
    if (!user) {
      return res.status(400).json("Khong tim thay user tuong ung");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Loi Server");
  }
});

app.get("/photos/:id", (req, res) => {
  try {
    const photosId = req.params.id;
    const photos = photoOfUserModel(photosId);
    if (!photosId) {
      return res.status(400).json("Khong tim thay anh cua user");
    }
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json("Loi Server");
  }
});

app.listen(8080, () => {
  console.log("Server is running at : http://localhost:8080 !");
});
