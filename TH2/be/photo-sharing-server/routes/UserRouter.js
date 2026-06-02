const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/", async (request, response) => {});

//GET userList
router.get("/list", async (req, res) => {
  try {
    const users = await User.find({}, "_id first_name last_name");
    if (!users) {
      return res.status(400).json({ message: "Khong tim thay danh sach user" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Loi server" });
  }
});

//GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(
      userId,
      "_id first_name last_name location description occupation"
    );
    if (!user) {
      return res.status(400).json({ message: "Khong tim thay user" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Loi server" });
  }
});

module.exports = router;
