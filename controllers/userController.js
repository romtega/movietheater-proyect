/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
import User from "../models/User.js";

const createUser = async (req, res) => {
  const userData = req.body;
  try {
    if (!userData) {
      return res.status(400).json({ message: "User data is missing" });
    }
    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "There are no users in this database" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { ...userData } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (req.query.destroy === "true") {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res.status(204).json();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: false }
    );
    if (!user || user.isActive === false) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
