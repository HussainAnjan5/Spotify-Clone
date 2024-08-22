const catchAsync = require('../utils/catchAsync');
const Song = require('../models/songModel');
const Playlist = require('../models/playlistModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const fileLocatoin = require('../utils/fileLocation');

exports.searchSong = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  const songs = await Song.find({
    name: { $regex: name, $options: 'ix' },
  }).populate('artist', 'name');

  if (songs.length === 0) return next(new AppError('No song found', 404));

  res.status(200).json({
    status: 'success',
    data: songs,
  });
});

exports.searchPlaylist = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  const playlists = await Playlist.find({
    name: { $regex: name, $options: 'ix' },
  }).populate('user', 'name');

  if (playlists.length === 0)
    return next(new AppError('No playlist found', 404));

  res.status(200).json({
    status: 'success',
    data: playlists,
  });
});

exports.searchArtist = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  const artists = await User.find({
    name: { $regex: name, $options: 'ix' },
    role: 'artist',
  });

  if (artists.length === 0) return next(new AppError('No artist found', 404));

  res.status(200).json({
    status: 'success',
    data: artists,
  });
});
