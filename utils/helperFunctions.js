const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const checkRole = (role) => {
  const allowedRoles = ["SUPERADMIN", "ADMIN", "MODERATOR"];
  return allowedRoles.includes(role) ? true : false;
};

const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(String(email).toLowerCase());
};

const hashPassword = (password) => bcrypt.hash(password, 10);

const comparePassword = (inputPwd, storedPwd) =>
  bcrypt.compare(inputPwd, storedPwd);

const generateToken = (email, password,isAdmin,_id,name) =>
  jwt.sign(
    {
      iat: Math.floor(Date.now() / 1000) - 30,
      email,
      password,
      isAdmin,
      _id,
      name
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" }
  );

const generateResetPwdToken = () => {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPwdToken field
  const resetPwdToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  const resetPwdExpire = Date.now() + 10 * 60 * 1000;

  return [resetToken, resetPwdToken, resetPwdExpire];
};

module.exports = {
  checkRole,
  validateEmail,
  hashPassword,
  comparePassword,
  generateToken,
  generateResetPwdToken,
};
