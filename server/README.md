# Server Setup

## Prerequisites

- Before setting up the server, make sure you have Node.js installed on your machine. It is recommended to have Node.js version 16 or higher. 
- Ensure that you are in the `/server` directory.

## Setup

To install all the required packages, run the following command:

```
npm install
```

## Environment Variables

Create a `.env` file and fill it with the following data. You can use `template.env` as a template and get default values

| Name        | Description                   | Acquire                                                                                                                                                                                                    |
| ----------- |-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DATABASE    | MongoDB database URL          | [Create a MongoDB cluster](https://www.mongodb.com/docs/guides/atlas/cluster/). Navigate to **Database Deployments** > **Click Connect button** > **Drivers** > **Set driver to Node.js** > Copy connection string |
| DB_PASSWORD | Database password             | Get the password for your database user                                                                                                                                                                    |
| CLIENT_URL  | Client URL for CORS           | It will appear on the console when you start the client app                                                                                                                                                 |
| JWT_SECRET  | JWT Secret                    | Generate a strong string                                                                                                                                                                                   |
| IK_PUBLIC   | ImageKit Public Key           | Open the [ImageKit](https://imagekit.io/) dashboard. Navigate to Developer Options > API Keys. You can get all the required data from there                                                                 |
| IK_PRIVATE  | ImageKit Private Key          | -                                                                                                                                                                                                          |
| IK_URL      | ImageKit URL endpoint         | -                                                                                                                                                                                                          |
| PORT        | Not required. Default: 8080 | -                                                                                                                                                                                                          |

## Start

To start the server application, run the following command:

```
npm run dev
```