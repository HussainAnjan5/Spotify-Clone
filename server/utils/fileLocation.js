const fileLocation = (req, list, folder, img, song) => {
  const server = `${req.protocol}://${req.get('host')}`;

  list.forEach((item) => {
    if (img) item.img = `${server}/public/${folder}/${item.img}`;
    if (song) item.song = `${server}/public/${folder}/${item.song}`;
  });
};

module.exports = fileLocation;
