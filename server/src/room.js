import * as db from './db';

class Room {

  _roomId = null;
  _ownerId = null;
  _isPrivate = false;
  _prompt = null;
  _genre = null;
  _whitelist = [];
  clients = {};
  clientOrder = [];
  currentWriter = 0;
  contributors = [];
  storySoFar = [];
  totalSentences = 20;
  isEnabled = true;

  constructor(roomId, ownerId, isPrivate, prompt, genre, whitelist) {
    this._roomId = roomId;
    this._ownerId = ownerId;
    this._isPrivate = isPrivate;
    this._prompt = prompt;
    this._genre = genre;
    this._whitelist = whitelist;
  }

  getActiveWriterId() {
    return this.clientOrder[this.currentWriter];
  }

  addWriter(userId, client) {
    this.clients[userId] = client;
    this.clientOrder.push(userId);
  }

  writerFinished(message) {
    this.storySoFar.push(message);
    this.totalSentences -= 1;

    if (this.contributors.indexOf(this.clientOrder[this.currentWriter]) <= 0) {
      this.contributors.push(this.clientOrder[this.currentWriter]);
    }

    if (this.totalSentences === 0) {
      this.isEnabled = false;
    } else {
      this.currentWriter = (this.currentWriter + 1) % this.clientOrder.length;
      for (const id of clientOrder) {
        clients[id].send(`${this.clientOrder[this.currentWriter]}:${this._roomId}:WRT`);
      }
    }

    db.saveStorySoFar(room);
  }

  getLastSentence() {
    if (this.storySoFar.length > 0) {
      return this.storySoFar[this.storySoFar.length - 1];
    }
    return '';
  }

  revealStory() {
    for (const id of clientOrder) {
      clients[id].send(`${id}:${this._roomId}:END:${this.storySoFar.join(' ')}`);
    }
  }

}