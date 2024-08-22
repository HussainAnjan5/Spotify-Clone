const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Playlist = require('../models/playlistModel');
const User = require('../models/userModel');
const fs = require('fs');
const fileLocation = require('../utils/fileLocation');
const imagekit = require('../utils/ImageKit');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'));
  }
};

exports.resizePlaylistImg = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `playlist-${req.params.id}-${Date.now()}.jpeg`;

  console.log('buffer', req.file);
  req.file.buffer = await sharp(req.file.buffer)
    .resize(512, 512)
    .toFormat('jpeg')
    .toBuffer();
  next();
});

const upload = multer({ storage, fileFilter });

exports.uploadPlaylistImg = upload.single('img');

exports.getAllPlaylists = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.user.id) filter.user = req.user.id.userId;

  const playlists = await Playlist.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    length: playlists.length,
    data: {
      playlists,
    },
  });
});

exports.getPlaylist = catchAsync(async (req, res, next) => {
  const playlist = await Playlist.findById(req.params.id)
    .populate('songs')
    .populate('user', 'name img');

  if (!playlist)
    return next(new AppError('❓ No playlist found with that id', 404));

  res.status(200).json({
    status: 'success',
    data: {
      playlist,
    },
  });
});

exports.createPlaylist = catchAsync(async (req, res, next) => {
  const playlist = await Playlist.create({ user: req.user.id });
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { playlists: playlist.id } },
    { runValidators: true, new: true }
  ).populate('playlists');

  // 2) Send res
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updatePlaylist = catchAsync(async (req, res, next) => {
  const data = {};

  if (req.file) {
    const imgKit = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.filename,
      folder: 'spotify/playlists',
    });
    data.img = imgKit.url;
  }

  if (req.body.name) data.name = req.body.name;
  if (req.body.description) data.description = req.body.description;

  const playlist = await Playlist.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  if (!playlist)
    return next(new AppError('❓ No playlist found with that id', 404));

  res.status(200).json({
    status: 'success',
    data: {
      playlist,
    },
  });
});

exports.deletePlaylist = catchAsync(async (req, res, next) => {
  const playlist = await Playlist.findByIdAndDelete(req.params.id);
  if (!playlist)
    return next(new AppError('❓ No playlist found with that id', 404));

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { playlists: req.params.id } },
    { runValidators: true, new: true }
  ).populate('playlists');

  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.addSong = catchAsync(async (req, res, next) => {
  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { songs: req.params.song } },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: 'success',
    message: `Song added to ${playlist.name}`,
  });
});

exports.removeSong = catchAsync(async (req, res, next) => {
  const playlist = await Playlist.findByIdAndUpdate(
    req.params.id,
    { $pull: { songs: req.params.song } },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      playlist,
    },
  });
});

exports.likePlaylist = catchAsync(async (req, res, next) => {
  const { playlist } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { likedPlaylists: playlist } },
    { runValidators: true, new: true }
  ).populate('likedPlaylists', 'name img');

  res.status(200).json({
    status: 'success',
    playlists: user.likedPlaylists,
  });
});

exports.dislikePlaylist = catchAsync(async (req, res, next) => {
  const { playlist } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { likedPlaylists: playlist } },
    { runValidators: true, new: true }
  ).populate('likedPlaylists', 'name img');

  res.status(200).json({
    status: 'success',
    playlists: user.likedPlaylists,
  });
});
