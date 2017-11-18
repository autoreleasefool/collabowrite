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

  writerFinished(message) {
    this.storySoFar.push(message);
    this.totalSentences -= 1;
    if (this.totalSentences === 0) {
      this.isEnabled = false;
    }
  }

  getLastSentence() {
    if (this.storySoFar.length > 0) {
      return this.storySoFar[this.storySoFar.length - 1];
    }
    return '';
  }


}