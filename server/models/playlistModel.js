const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Name must be more that 3 characters'],
      maxLength: [20, 'Name must be at most 20 characters'],
      trim: true,
      default: 'Your playlist',
    },
    description: {
      type: String,
      trim: true,
      maxLength: [300, 'Description must be at most 300 characters'],
    },
    img: {
      type: String,
      default:
        'https://ik.imagekit.io/8cs4gpobr/spotify/playlists/default.png?updatedAt=1696157039341',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please specify owner'],
    },
    songs: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Song',
        },
      ],
      validate: {
        validator: (arr) => arr.length <= 30,
        message: 'You can not add more than 30 songs to your playlist',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Playlist = new mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
