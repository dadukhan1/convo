import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send("hello");
})
router.get("/login", (req, res) => {
    res.send("hello");
})
router.get("/logout", (req, res) => {
    res.send("hello");
})

export default router;