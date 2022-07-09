const { off } = require("../models/user");
const user = require("../models/user");
const {
  validateEmail,
  hashPassword,
  comparePassword,
  generateToken,
} = require("../utils/helperFunctions");

const bcrypt = require("bcryptjs");
const loginController = async (req, res) => {
  // try {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Invalid Credentials" });
    return;
  }

  const userExist = await user.findOne({ email: email });

  if (!userExist) {
    res.status(400).json({ message: "Invalid Credentials" });
    return;
  }

  const isPasswordMatch = await comparePassword(password, userExist.password);

  if (!isPasswordMatch) {
    res.status(400).json({ message: "Invalid Password" });
    return;
  }

  const { isAdmin, _id, name, photoUrl } = userExist;

  const token = await generateToken(email, password, isAdmin, _id, name);

  res.status(200).json({
    message: "Login success",
    success: true,
    token: token,
    user: {
      id: _id,
      name: name,
      email: email,
      photoUrl: photoUrl,
    },
  });
  return;
  // } catch (error) {
  //   res.status(500).json(error);
  //   return;
  // }
};

const registerController = async (req, res) => {
  try {


  const { name, email, password, rePassword, photoUrl } = req.body;

  const isEmailAlreadyExist = await user.findOne({ email: email });

  if (isEmailAlreadyExist) {
    res.status(401).json({ message: "User already exists" });
    return;
  }

  if (password !== rePassword) {
    res.status(401).json({ message: "Password is not match" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new user({
    name: name,
    email: email,
    password: hashedPassword,
    photoUrl: photoUrl,
  });

  const userStatus = await newUser.save();

  res.status(201).json({  success: true });
  return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    const userFound = await user.findOne({ email: email });

    if (!userFound) {
      res.status(400).json({ message: "Account Not Found" });
      return;
    }

    const passwordIsMatch = await comparePassword(password, userFound.password);

    if (!passwordIsMatch) {
      res
        .status(400)
        .json({ message: "Password is not match and can't update user data" });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    const status = await user.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    res.status(201).json({ success: true, message: "Password Updated" });
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { email } = req.body;

    const userToDelete = await user.findOneAndDelete({ email: email });

    res.status(202).json({ success: true, message: "Account Deleted" });
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

module.exports = {
  loginController,
  registerController,
  resetPassword,
  deleteAccount,
};
