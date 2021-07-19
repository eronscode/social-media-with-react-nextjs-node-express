const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const ProfileModel = require("../models/ProfileModel");
const bcrypt = require("bcryptjs");

// GET PROFILE INFO
router.get("/:username", authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).send("No User Found");
    }

    const profile = await ProfileModel.findOne({ user: user._id }).populate("user");

    const profileFollowStats = await FollowerModel.findOne({ user: user._id });

    return res.json({
      profile,

      followersLength:
        profileFollowStats.followers.length > 0 ? profileFollowStats.followers.length : 0,

      followingLength:
        profileFollowStats.following.length > 0 ? profileFollowStats.following.length : 0
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// GET POSTS OF USER
router.get(`/posts/:username`, authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).send("No User Found");
    }

    const posts = await PostModel.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");

    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// GET FOLLOWERS OF USER
router.get("/followers/:userId", authMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await FollowerModel.findOne({ user: userId }).populate("followers.user");
  
      return res.json(user.followers);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });
  
  // GET FOLLOWING OF USER
  router.get("/following/:userId", authMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await FollowerModel.findOne({ user: userId }).populate("following.user");
  
      return res.json(user.following);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });
  
  // FOLLOW A USER
  router.post("/follow/:userToFollowId", authMiddleware, async (req, res) => {
    try {
      const { userId } = req;
      const { userToFollowId } = req.params;
  
      const user = await FollowerModel.findOne({ user: userId });
      const userToFollow = await FollowerModel.findOne({ user: userToFollowId });
  
      if (!user || !userToFollow) {
        return res.status(404).send("User not found");
      }
  
      const isFollowing =
        user.following.length > 0 &&
        user.following.filter(following => following.user.toString() === userToFollowId)
          .length > 0;
  
      if (isFollowing) {
        return res.status(401).send("User Already Followed");
      }
  
      await user.following.unshift({ user: userToFollowId });
      await user.save();
  
      await userToFollow.followers.unshift({ user: userId });
      await userToFollow.save();
  
      return res.status(200).send("Updated");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });
  
  // UNFOLLOW A USER
  router.put("/unfollow/:userToUnfollowId", authMiddleware, async (req, res) => {
    try {
      const { userId } = req;
      const { userToUnfollowId } = req.params;
  
      const user = await FollowerModel.findOne({
        user: userId
      });
  
      const userToUnfollow = await FollowerModel.findOne({
        user: userToUnfollowId
      });
  
      if (!user || !userToUnfollow) {
        return res.status(404).send("User not found");
      }
  
      const isFollowing =
        user.following.length > 0 &&
        user.following.filter(following => following.user.toString() === userToUnfollowId)
          .length === 0;
  
      if (isFollowing) {
        return res.status(401).send("User Not Followed before");
      }
  
      const removeFollowing = await user.following
        .map(following => following.user.toString())
        .indexOf(userToUnfollowId);
  
      await user.following.splice(removeFollowing, 1);
      await user.save();
  
      const removeFollower = await userToUnfollow.followers
        .map(follower => follower.user.toString())
        .indexOf(userId);
  
      await userToUnfollow.followers.splice(removeFollower, 1);
      await userToUnfollow.save();
  
      return res.status(200).send("Updated");
    } catch (error) {
      console.error(error);
      res.status(500).send("server error");
    }
  });