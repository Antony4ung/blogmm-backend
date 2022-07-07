const router = require("express").Router();
const {
  loginController,
  registerController,
  resetPassword,
  deleteAccount,
} = require("../controllers/auth");
const multerFun = require("../utils/multerFun");

router.post("/register",multerFun.upolad.single('image'), registerController);
router.post("/login", loginController);
router.put("/resetPassword", resetPassword);
router.delete("/deleteAccount", deleteAccount);

module.exports = router;
