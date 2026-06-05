const express = require("express");
const router = express.Router();
const User = require("../db/userModel");
const jwt = require("jsonwebtoken");
const Photo = require("../db/photoModel");
const requireAuth = require("../middleware/requireAuth");

router.post("/:photo_id", requireAuth, async (req, res) => {
  try {
    const photoId = req.params.photo_id;
    const photo = await Photo.findById(photoId);
    const { comment } = req.body;
    if (comment === "") {
      return res.status(400).json({ message: "Comment khong duoc rong" });
    }
    const currentUser = await User.findById(
      req.user.id,
      "_id first_name last_name"
    );
    photo.comments.push({
      comment: comment.trim(),
      date_time: new Date(),
      user_id: currentUser._id,
    });
    await photo.save();
    const newComment = photo.comments[photo.comments.length - 1];
    return res.status(200).json({
      message: "Them comment thanh cong !",
      _id: newComment._id,
      date_time: newComment.date_time,
      comment: newComment.comment,
      user: {
        _id: currentUser._id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Loi phia server" });
  }
});

module.exports = router;
