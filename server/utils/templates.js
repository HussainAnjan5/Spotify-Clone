exports.welcomeTemplate = () => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;1,400&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      html {
        font-size: 62.5%;
      }

      body {
        color: #080f18;
        background-color: #f7f7f7;
        padding: 10rem 0;
        font-family: "Montserrat", sans-serif;
        text-align: center;
      }

      .container {
        max-width: 60rem;
        margin: 0 auto;
        background-color: #509bf5;
        padding: 48px 32px;
      }

      .logo img {
        height: 80px;
      }

      .cover {
        margin: 16px 0;
      }

      .cover img {
        width: 100%;
        box-shadow: 10px 10px 0;
      }

      .heading {
        font-size: 24px;
        padding-top: 24px;
        padding-bottom: 16px;
      }

      .paragraph {
        font-size: 16px;
        line-height: 1.5;
        font-weight: 600;
        padding-bottom: 16px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
          alt=""
        />
      </div>
      <div class="cover">
        <img
          src="https://images.unsplash.com/photo-1627734819947-ba884aea9801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1517&q=80"
          alt=""
        />
      </div>
      <h1 class="heading">
        Welcome to Spotify! We are thrilled to have you join our music
        community. 🎉
      </h1>
      <p class="paragraph">
        With Spotify, you can access millions of songs and podcasts, create your
        own playlists, and discover new music that suits your taste. 🎧
      </p>
      <p class="paragraph">
        To get started, simply download the Spotify app or visit our website,
        and sign in using your email and password. Once you're signed in, you
        can start exploring and listening to your favorite music right away! 🎶
      </p>
      <p>Made with ❤️ by <a color="black" href="https://github.com/maqsudtolipov">Maqsud</a></p>
    </div>
  </body>
</html>
`;

exports.resetTokenTemplate = (resetToken) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;1,400&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      html {
        font-size: 62.5%;
      }

      body {
        color: #080f18;
        background-color: #f7f7f7;
        padding: 10rem 0;
        font-family: "Montserrat", sans-serif;
        text-align: center;
      }

      .container {
        max-width: 60rem;
        margin: 0 auto;
        background-color: #509bf5;
        padding: 48px 32px;
      }

      .logo img {
        height: 80px;
      }

      .cover {
        margin: 16px 0;
        padding-bottom: 16px;
      }

      .cover img {
        width: 100%;
        box-shadow: 10px 10px 0;
      }

      .heading {
        font-size: 24px;
        padding-top: 24px;
        padding-bottom: 16px;
      }

      .paragraph {
        font-size: 16px;
        line-height: 1.5;
        font-weight: 600;
        padding-bottom: 16px;
      }

      .link:link,
      .link:visited {
        display: inline-block;
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        padding: 16px 32px;
        border-radius: 50px;
        transition: all 0.2s;
        margin-bottom: 32px;
      }

      .link:hover {
        background-color: #222;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
          alt=""
        />
      </div>
      <div class="cover">
        <img
          src="https://images.unsplash.com/photo-1627734819947-ba884aea9801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1517&q=80"
          alt=""
        />
      </div>
      <p class="paragraph">
        We're sorry to hear that you're having trouble accessing your Spotify
        account. Not to worry, though – we can help you reset your password! 🔑
      </p>
      <p class="paragraph">
        To reset your password, simply click the button below and follow the
        instructions
      </p>
      <a class="link" href="https://maqsud-spotify.vercel.app/resetPassword/${resetToken}">Reset your password</a>
      <p class="paragraph">
        If you didn't request a password reset, please ignore this email.
      </p>
      <p>Made with ❤️ by <a color="black" href="https://github.com/maqsudtolipov">Maqsud</a></p>
    </div>
  </body>
</html>
`;
