import * as db from './db';

interface ClientWebSockets {
  [key: string]: WebSocket;
}

export default class Room {

  roomId: string;
  ownerId: string;
  prompt: string;
  genre: string;
  isPrivate: boolean;
  whitelist: string[];

  storySoFar: string[]= [];
  totalSentences: number = 0;
  isEnabled: boolean = true;

  clients: ClientWebSockets;
  clientOrder: string[] = [];
  contributors: string[] = [];

  currentWriter: number = 0;

  constructor(
      roomId: string,
      ownerId: string,
      isPrivate: boolean,
      prompt: string,
      genre: string,
      whitelist: string[]) {
    this.roomId = roomId;
    this.ownerId = ownerId;
    this.isPrivate = isPrivate;
    this.prompt = prompt;
    this.genre = genre;
    this.whitelist = whitelist;
  }

  getActiveWriterId(): string {
    return this.clientOrder[this.currentWriter];
  }

  addWriter(userId: string, client: WebSocket): void {
    this.clients[userId] = client;
    this.clientOrder.push(userId);
  }

  writerFinished(message: string): void {
    this.storySoFar.push(message);
    this.totalSentences -= 1;

    if (this.contributors.indexOf(this.clientOrder[this.currentWriter]) <= 0) {
      this.contributors.push(this.clientOrder[this.currentWriter]);
    }

    if (this.totalSentences === 0) {
      this.isEnabled = false;
    } else {
      this.currentWriter = (this.currentWriter + 1) % this.clientOrder.length;
      for (const id of this.clientOrder) {
        this.clients[id].send(`${this.clientOrder[this.currentWriter]}:${this.roomId}:WRT`);
      }
    }

    db.saveStorySoFar(this);
  }

  getLastSentence(): string {
    if (this.storySoFar.length > 0) {
      return this.storySoFar[this.storySoFar.length - 1];
    }

    return '';
  }

  revealStory(): void {
    for (const id of this.clientOrder) {
      this.clients[id].send(`${id}:${this.roomId}:END:${this.storySoFar.join(' ')}`);
    }
  }

}
