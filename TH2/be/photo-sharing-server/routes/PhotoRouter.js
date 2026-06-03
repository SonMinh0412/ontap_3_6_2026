const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const User = require("../db/userModel");
const requireAuth = require("../middleware/requireAuth")

router.post("/", async (request, response) => {});

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const checkId = await User.findById(userId);
    if (!checkId) {
      return res.status(400).json({ message: "User khong hop le" });
    }
    const photos = await Photo.find({ user_id: userId });
    const data = await Promise.all(
      photos.map(async (photo) => {
        const comments = await Promise.all(
          (photo.comments || []).map(async (comment) => {
            const commentUser = await User.findById(
              comment.user_id,
              "_id first_name last_name"
            );
            return {
              _id: comment._id,
              comment: comment.comment,
              date_time: comment.date_time,
              user: commentUser
                ? {
                    _id: commentUser._id,
                    first_name: commentUser.first_name,
                    last_name: commentUser.last_name,
                  }
                : null,
            };
          })
        );
        return {
          _id: photo._id,
          user_id: photo.user_id,
          comments: comments,
          file_name: photo.file_name,
          date_time: photo.date_time,
        };
      })
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Loi Server" });
  }
});

module.exports = router;
