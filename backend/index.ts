import {buildServerArch, createSocketServer} from "./src";
// @ts-ignore
import {config} from './src/lib/config/config';
import * as fs from 'fs';
import * as path from "path";
import * as socket_io from "socket.io";
import {usersComponent} from "./src/lib/handlers/users";
import {appComponent} from "./src/lib/handlers/app";

const server = buildServerArch(false);
const io = createSocketServer(server);

io.on('connection', (socket: socket_io.Socket) => {
  const {room_id} = socket.handshake.query;

  room_id ? socket.join(room_id) : ''

  appComponent(socket, io)
  usersComponent(socket, io)
})

server.listen(config.port, () => {
  console.log('App started')
})