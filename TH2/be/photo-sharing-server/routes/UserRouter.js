const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth")

router.post("/", async (req, res) => {
  try {
    const {loginname, password, first_name, last_name, location, description, occupation} = req.body;
    if(!first_name || !last_name || !password || !loginname){
      return res.status(400).json({message : "Login_name Password First_name Last_name khong duoc de trong"});
    }
    const existUser = User.findOne(login_name);
    if(existUser){
      return res.status(400).json({message : "Login_name da ton tai"});
    }
    const newUser = await User.create({
      loginname,
      password,
      first_name,
      last_name,
      location,
      description,
      occupation
    })
    res.status(200).json({message : "Tao user thanh cong"})
  } catch(error){
    res.status(500).json({message : "Loi Server"});
  }
});

//GET userList
router.get("/list",requireAuth, async (req, res) => {
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
router.get("/:id",requireAuth, async (req, res) => {
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
