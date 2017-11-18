// Open websocket
const websocket = require ('ws');
const wss = new websocket({ port: 3000 });

var currRoomId = 0;
var userId = 0;
var iterations = //no. of plays * no. of clients in the whitelist;
// Ask the user the number of plays?

wss.on('connection',function connection (ws)) {
  ws.on('message', function incoming (message)) {
    var stringSoFar = '';
    if (currRoomId == 0) {
      currRoomId = message;
    }
    else if (userId == 0) {
      userId = message;
    }
    else {
      switch (message.substr(0,4)) {
      case 'MSG:':
      stringSoFar = stringSoFar + message.split('.',1);
      if (message.includes('.')) {
        switchState(stringSoFar);
        stringSoFar = '';
      }
      break;
      case 'DIS:':
      switchState(stringSoFar);
      stringSoFar = '';
      break;
      // handle errors
      default :
    }
  }
}

function switchState(sentence) {
  ++iterations;
  if (iterations == 5;) {
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
