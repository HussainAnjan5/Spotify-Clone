const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Authentication
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/isLoggedIn', authController.isLoggedIn);

router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:resetToken', authController.resetPassword);

router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.patch(
  '/updateMe',
  authController.protect,
  userController.uploadPhoto,
  userController.resizeUserImg,
  userController.updateMe
);
router.delete('/deleteMe', authController.protect, authController.deleteMe);

// Artist control
router.get('/:id', authController.protect, userController.getArtist);
router.post('/follow/:id', authController.protect, userController.followArtist);
router.post(
  '/unfollow/:id',
  authController.protect,
  userController.unfollowArtist
);
router.patch(
  '/becomeArtist',
  authController.protect,
  userController.becomeArtist
);

router
  .route('/likes/add')
  .post(authController.protect, userController.likeSong);

router
  .route('/likes/remove')
  .post(authController.protect, userController.dislikeSong);

module.exports = router;
