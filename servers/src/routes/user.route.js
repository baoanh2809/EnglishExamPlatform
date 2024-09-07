const express = require("express");
const {
  signUp,
  signIn,
  getMe,
  getUserById,
} = require("../controllers/user.controller");
const authorization = require("../middlewares/authorization.middleware");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/me", authorization,getMe);
router.get("/users/:id", getUserById);
// router.post("/admin/signout", signOut);
// router.post("/admin", createAdmin);

module.exports = router;