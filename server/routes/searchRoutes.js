const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/song', searchController.searchSong);
router.get('/playlist', searchController.searchPlaylist);
router.get('/artist', searchController.searchArtist);

module.exports = router;
