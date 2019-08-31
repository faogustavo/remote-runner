import { Server } from 'ws'
import Connection from './Connection';
import http from 'http'

const httpServer = http.createServer({})
const server = new Server({ server: httpServer })

server.on('connection', (socket) => new Connection(socket))
httpServer.listen(8080)

console.log('server up')