var app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var cors = require('cors');

app.use(cors())
// chats = []

io.on('connection', (socket) => {

    // chats.push(socket.id)

    // console.log(chats)
    socket.on('disconnect', ()=>{
        console.log(socket.id + " disconnected")
        // chats = chats.filter( x => x !== socket.id)
        // console.log(chats)
        // Send out disconnect message with socket.id
    })
    socket.broadcast.emit('newParticipant', socket.id)

    //Peer to peer offer
    //relay to appropriate socket connection
    socket.on('p2pOffer', payload => {
        const socketId = payload.toSocketId
        socket.to(socketId).emit('p2pOffer', payload)
        //relaying message to 
    })

    //p2p answer relay
    socket.on('p2pAnswer', payload => {
        const socketId = payload.toSocketId
        socket.to(socketId).emit('p2pAnswer', payload)
    })

    socket.on('screenSize', (data) => socket.broadcast.emit('screenSize', data));
    socket.on('startFreeHand', (data) => socket.broadcast.emit('startFreeHand', data));
  socket.on('freeHand', (data) => socket.broadcast.emit('freeHand', data));
  socket.on('release', () => socket.broadcast.emit('release'));
  socket.on('point', (data) => socket.broadcast.emit('point', data));
  socket.on('startCircle', (data) => socket.broadcast.emit('startCircle', data));
  socket.on('circle', (data) => socket.broadcast.emit('circle', data));
  socket.on('startRectangle', (data) => socket.broadcast.emit('startRectangle', data));
  socket.on('rectangle', (data) => socket.broadcast.emit('rectangle', data));
  socket.on('startErase', (data) => {socket.broadcast.emit('startErase', data); console.log('startErase');});
  socket.on('erase', (data) => {socket.broadcast.emit('erase', data); console.log('erase');});
  socket.on('undo', () => socket.broadcast.emit('undo'));
  socket.on('redo', () => socket.broadcast.emit('redo'));
  socket.on('clear', () => socket.broadcast.emit('clear'));



})

http.listen(4000, () => {
    console.log('socket server started on port 4000')
})