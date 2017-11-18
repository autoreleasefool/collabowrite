// Open websocket
import * as WebSocket from 'ws';
import Room from 'src/room';
import { Server } from 'http';

let wss;
const openRooms = {};

const HEARTBEAT_EXPIRY = 10000;

export function startWebSocket(server: Server): void {
  wss = new WebSocket.Server({ server });
  wss.on('connection', onConnection);
  wss.on('message', onMessage);

  setInterval(() => {
    wss.clients.forEach((ws: WebSocket) => {
      if (!(ws as any).isAlive) {
        return ws.terminate();
      }

      (ws as any).isAlive = false;
      ws.ping(undefined, false, true);
    });
  }, HEARTBEAT_EXPIRY);
}

export function createNewRoom(room: Room): void {
  openRooms[room.roomId] = room;
}

function onConnection(ws: WebSocket): void {
  (ws as any).isAlive = true;
  ws.on('pong', () => {
    (ws as any).isAlive = true;
  });

  ws.on('message', (message: string) => onMessage(ws, message));
}

function onMessage(ws: WebSocket, message: string): void {
  // tslint:disable no-magic-numbers
  const components = message.split(':', 4);
  const userId = components[0];
  const roomId = components[1];
  const command = components[2];
  const userMessage = components.length > 3 ? components[3] : undefined;
  // tslint:enable no-magic-numbers

  const room = openRooms[roomId];
  if (!room) {
    // Room no longer exists
    return;
  }

  const clients = room.clients;
  if (!(userId in clients)) {
    room.addWriter(userId, ws);
  }

  switch (command) {
    case 'MSG':
      if (userMessage.includes('.')) {
        room.writerFinished(userMessage.split('.')[0]);
      }

      if (!room.isEnabled) {
        room.revealStory();
      }
      break;
    case 'DIS':
      if (room.getActiveWriterId() === userId) {
        room.writerFinished();
      }
      break;
    default :
      // handle errors
  }
}
