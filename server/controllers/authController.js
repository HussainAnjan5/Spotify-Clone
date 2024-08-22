const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    withCredentials: true,
  };
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    data: { user },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  const user = await User.create(userData);

  // await new Email(user).sendWelcome();

  createSendToken(user, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('🚫 Please provide email and password', 400));
  }

  // 2) Get the user from DB
  const user = await User.findOne({ email })
    .select('+password')
    .populate('playlists')
    .populate('followedArtists', 'name img role')
    .populate('likedPlaylists', 'name img')
    .populate('likedSongs');

  if (!user) {
    return next(new AppError(`🤷‍ No user found with email: ${email}`, 404));
  }

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError('🔐 Incorrect email or password', 401));
  }

  createSendToken(user, 200, req, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    withCredentials: true,
  };
  res.cookie('jwt', 'loggedOut', cookieOptions);
  res.status(200).json({ status: 'success', message: '✌️ See you soon!' });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('🔐 You are not logged in! Please log in to access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError(
        '🔐 The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  if (user.changedPasswordAfter(decoded.iat, 'protect')) {
    return next(
      new AppError(
        '🔐 Your password has been changed. Please log in again.',
        401
      )
    );
  }

  req.user = user;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const user = await User.findById(decoded.id)
        .populate('playlists')
        .populate('followedArtists', 'name img role')
        .populate('likedPlaylists', 'name img')
        .populate('likedSongs');

      if (!user) {
        return next(
          new AppError(
            '🔐 The user belonging to this token does no longer exist.',
            401
          )
        );
      }

      if (user.changedPasswordAfter(decoded.iat, 'login')) {
        return next(
          new AppError(
            '🔐 Your password has been changed. Please log in again.',
            401
          )
        );
      }

      res.status(200).json({
        status: 'success',
        data: { user },
      });
    }
  } catch (err) {
    res.status(401).json({
      status: 'error',
      message: '🍪 Please log in first',
    });
  }
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          '⛔ You do not have permission to perform this action!',
          401
        )
      );
    }

    return next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError('🤷‍ There is no user with that email', 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // await new Email(user).sendResetToken(resetToken);

  res.status(200).json({
    status: 'success',
    message: 'Token sent to email',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const resetToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetExpires: { $gt: Date.now() },
  })
    .populate('playlists')
    .populate('followedArtists', 'name img role')
    .populate('likedPlaylists', 'name img')
    .populate('likedSongs');

  if (!user) {
    return next(new AppError('🚫 Token is invalid or expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.checkPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('🔐 Your password is incorrect', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 201, req, res);
});

exports.deleteMe = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  if (user.img !== 'default.jpg')
    fs.unlink(`public/users/${user.img}`, (err) => console.log(err));

  res.status(204).json({
    status: 'success',
  });
});
