const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, 'Your name must be at least 3 characters'],
      maxLength: [20, 'Name must be at most 20 characters'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    img: {
      type: String,
      default:
        'https://ik.imagekit.io/8cs4gpobr/spotify/users/default.jpg?updatedAt=1696157096636',
    },
    likedSongs: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Song',
        },
      ],
      validate: {
        validator: (arr) => arr.length <= 50,
        message: 'You can not like more than 50 songs',
      },
    },
    playlists: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Playlist',
        },
      ],
    },
    likedPlaylists: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Playlist',
        },
      ],
    },
    followedArtists: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      ],
    },
    role: {
      type: String,
      enum: ['user', 'artist'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 16,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        validator(confirm) {
          return confirm === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    passwordChangedAt: { type: Date },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('songs', {
  ref: 'Song',
  foreignField: 'artist',
  localField: '_id',
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  return next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.checkPassword = async function (pass, realPass) {
  return await bcrypt.compare(pass, realPass);
};

userSchema.methods.changedPasswordAfter = function (JWTIssuedTime, where) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTIssuedTime < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(12).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
