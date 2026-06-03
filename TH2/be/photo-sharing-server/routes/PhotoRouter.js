const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const User = require("../db/userModel");
const requireAuth = require("../middleware/requireAuth");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/new", requireAuth, upload.single("photo"), async (req, res) => {
  try {
    const newPhoto = await Photo.create({
      file_name: req.file.filename,
      date_time: new Date(),
      user_id: req.user.id,
      comments: [],
    });
    res.status(200).json({ message: "Upload ảnh thành công" });
  } catch (error) {
    res.status(500).json({ message: "Loi server" });
  }
});

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
