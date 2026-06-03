const express = require("express");
const router = express.Router();
const User = require("../db/userModel")
const jwt = require("jsonwebtoken");

router.post("/login", async (req,res) => {
    try {
        const {login_name,password} = req.body;
        const user = await User.findOne({login_name});
        if(!user || user.password !== password){
            return res.status(400).json({message : "Tai khoan khong chinh xac"})
        }
        const jwt = require("jsonwebtoken");
        const token = jwt.sign({
            id : user._id,
            login_name : user.login_name,
            first_name : user.first_name,
        }, process.env.JWT_SECRET, 
            {expiresIn : "1h"}
        )
        res.status(200).json({token, user : {
            _id : user._id,
            login_name : user.login_name,
            first_name : user.first_name
        }});
    } catch(error){
        res.status(500).json({message : "Loi phia server"})
    }
})

router.post("/logout", (req,res) => {
    res.status(200).json({message : "Dang xuat thanh cong"})
})


module.exports = router;