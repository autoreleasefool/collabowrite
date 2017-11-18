// Open websocket
import * as WebSocket from 'ws';

let wss;
let openRooms = {};

export function startWebSocket(server) {
  wss = WebSocket.Server({ server });
  wss.on('connection', onConnection);
  wss.on('message', onMessage);

  setInterval(() => {
    wss.clients.forEach((ws) => {
      if (!ws.isAlive) return ws.terminate();

      ws.isAlive = false;
      ws.ping(null, false, true);
    })
  }, 10000);
}

function createNewRoom(room) {
  openRooms[room.getId()] = room;
}

function onConnection(ws) {
  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', (message) => onMessage(ws, message));
}

function onMessage(ws, message) {
  const components = message.split(':', 4);
  const userId = components[0];
  const roomId = components[1];
  const command = components[2];
  const message = components.length > 3 ? components[3] : null;

  const room = openRooms[roomId];
  if (room == null) {
    // Room no longer exists
    return;
  }

  const clients = room.clients;
  if (!(userId in clients)) {
    room.addWriter(userId, ws);
  }

  switch (command) {
    case 'MSG':
      if (message.includes('.')) {
        room.writerFinished(message.split('.')[0]);
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

function switchState(sentence) {
  ++iterations;
  if (iterations == 5) {
    // End-game
  }
  addSentence(sentence, currRoomId); //from db.js
  userId = getNextUser(currRoomId);
  // End-game if this was the last user
}

//Update the sentence for the roomId
export async function addSentence(_roomId, sentence) {
  var myRoom = getRoom(_roomId);
}

// Get the next userId in the whitelist, returns false if none.
export async function getNextUser(_roomId) {
  var myRoom = getRoom(_roomId);
  // user Curruserid
  // return next curruserid in whitelist
}
