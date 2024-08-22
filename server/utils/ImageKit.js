const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IK_PUBLIC,
  privateKey: process.env.IK_PRIVATE,
  urlEndpoint: process.env.IK_URL,
});

module.exports = imagekit;
