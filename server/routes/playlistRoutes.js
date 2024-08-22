const express = require('express');
const playlistController = require('../controllers/playlistController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, playlistController.getAllPlaylists)
  .post(authController.protect, playlistController.createPlaylist);

router
  .route('/:id')
  .get(authController.protect, playlistController.getPlaylist)
  .patch(
    authController.protect,
    playlistController.uploadPlaylistImg,
    playlistController.resizePlaylistImg,
    playlistController.updatePlaylist
  )
  .delete(authController.protect, playlistController.deletePlaylist);

router
  .route('/:id/song/:song')
  .post(authController.protect, playlistController.addSong)
  .delete(authController.protect, playlistController.removeSong);

router
  .route('/likes/add')
  .post(authController.protect, playlistController.likePlaylist);

router
  .route('/likes/remove')
  .post(authController.protect, playlistController.dislikePlaylist);

module.exports = router;
