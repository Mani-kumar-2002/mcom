const express = require("express");
const { 
  loginUser, 
  logoutUser,
  registerUser, 
  forgotPassword, 
  resetPassword,
  checkAuthStatus 
} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logoutUser);
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", checkAuthStatus);

module.exports = router;