const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.emit('newMessage', {
    from: 'nidhi',
    text: "Hey, What's up",
    createdAt: 123,
  });
  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
  });
  socket.on('disconnect', () => {
    console.log('user as disconnect');
  })
});

server.listen(3000, () => {
  console.log(`server is up on ${port}`);
});