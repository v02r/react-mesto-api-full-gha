const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateUserPatch,
  validateUserAvatar,
  validateUserId,
} = require('../validate/validate');

router.get('/users', getUsers);

router.get('/users/me', getCurrentUser);

router.get('/users/:userId', validateUserId, getUserById);

router.patch('/users/me', validateUserPatch, updateUser);

router.patch('/users/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
