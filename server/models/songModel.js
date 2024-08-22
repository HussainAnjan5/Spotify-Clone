const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A song must have a name'],
      trim: true,
      unique: true,
      minLength: [3, 'Song name must be more that 3 characters'],
      maxLength: [30, 'Song name must be at most 30 characters'],
    },
    artist: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A song must belong to an artist'],
    },
    song: {
      type: String,
      required: [true, 'A song must have a song file'],
    },
    img: {
      type: String,
      required: [true, 'A song must have a cover img'],
    },
    plays: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Song = new mongoose.model('Song', songSchema);

module.exports = Song;
