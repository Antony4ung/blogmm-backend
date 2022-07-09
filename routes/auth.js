const router = require("express").Router();
const {
  loginController,
  registerController,
  resetPassword,
  deleteAccount,
} = require("../controllers/auth");

router.post("/register", registerController);
router.post("/login", loginController);
router.put("/resetPassword", resetPassword);
router.delete("/deleteAccount", deleteAccount);

module.exports = router;
