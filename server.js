// server.js
// import express from 'express';
// import dotenv from 'dotenv';
// import 'babel-polyfill';
// import GifWithJsObject from './src/usingJSObject/controllers/gif';
// import GifWithDB from './src/usingDB/controller/gif';
// import UserWithDb from './src/usingDB/controller/Users';
// import Auth from './src/usingDB/middleware/Auth';
const express = require('express');
const dotenv = require('dotenv');
const babelpolyfill = require('babel-polyfill');
const GifWithJsObject = require('./src/usingJSObject/controllers/gif');
const GifWithDB = require('./src/usingDB/controller/gif');
const UserWithDb = require('./src/usingDB/controller/Users');
const Auth = require('./src/usingDB/middleware/Auth');


dotenv.config();
const Gif = process.env.TYPE === 'db' ? GifWithDB : GifWithJsObject;
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});

// AUTH ROUTES
app.post('/auth/v1/create-user', UserWithDb.create);
app.post('/auth/v1/signin', UserWithDb.login);
app.delete('/auth/v1/users/me', Auth.verifyToken, UserWithDb.delete);

// GIF ROUTES
app.post('/api/v1/gif',  /* Auth.verifyToken,*/ Gif.create);
app.get('/api/v1/gif',  /* Auth.verifyToken,*/ Gif.getAll);
app.get('/api/v1/gif/:gifid', /* Auth.verifyToken,*/ Gif.getOne);
app.put('/api/v1/gif/:gifid',  /* Auth.verifyToken,*/ Gif.update);
app.delete('/api/v1/gif/:gifid',  /* Auth.verifyToken,*/ Gif.delete);




app.listen(3000)
console.log('app running on port ', 3000);