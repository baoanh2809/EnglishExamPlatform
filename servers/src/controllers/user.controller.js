const userService = require("../services/user.service");

const signUp = async (req, res) => {
  
  const { email, password, confirmPassword, fullname, roleName } = req.body;
  try {
    await userService.signUp({
      email,
      password,
      confirmPassword,
      fullname,
      roleName,
    });
    res.json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    if (error.message === "Email already exists") {
      return res.status(409).json({ error: error.message });
    }
    if (error.message === "Passwords do not match") {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

//Sign in
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await userService.signIn({
      email,
      password,
    });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unable to sign in" });
  }
};

const getMe = async (req, res) => {
  const { user } = req;
  res.json({ user });
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signUp,
  signIn,
  getMe,
  getUserById
};
