import { default as Mongo, ObjectID } from 'mongodb';
import Room from './room';

const MongoClient = Mongo.MongoClient;
let db: Mongo.Db;
const databaseUrl = 'mongodb://localhost:27017/collabowrite';

const COLLECTION_USERS = 'users';
const COLLECTION_ROOMS = 'rooms';

export interface UserDocument {
  username: string;
  password: string;
}

export interface RoomDocument {
  _id?: ObjectID;
  contributors: ObjectID[];
  genre: string;
  isPrivate: boolean;
  mode: number;
  owner: ObjectID;
  prompt: string;
  storySoFar: string[];
  whitelist: ObjectID[];
}

export async function init(): Promise<void> {
  const mongodb = await MongoClient.connect(databaseUrl);
  db = mongodb;
}

export function close(): void {
  db.close();
  db = undefined;
}

// Sign up, return the id
export async function signUp(username: string, password: string): Promise<ObjectID> {
  const user = await db.collection(COLLECTION_USERS).findOne({ username });
  if (user) {
    throw Error('Username taken!');
  }

  const userResult = await db.collection(COLLECTION_USERS).insertOne({ username, password } as UserDocument);

  return userResult.insertedId;
}

// Login, return the user
export async function logIn(username: string, password: string): Promise<ObjectID> {
  const user = await db.collection(COLLECTION_USERS).findOne({ username, password });

  return user._id;
}

// Create a new room
export async function createRoom(
    userId: ObjectID,
    mode: number,
    isPrivate: boolean,
    whitelist: ObjectID[],
    prompt: string,
    genre: string): Promise<ObjectID> {

  const newRoom: RoomDocument = {
    contributors: [],
    genre,
    isPrivate,
    mode,
    owner: userId,
    prompt,
    storySoFar: [],
    whitelist: whitelist || [],
  };

  const roomResult = await db.collection(COLLECTION_ROOMS).insertOne(newRoom);

  return roomResult.insertedId;
}

// Get a room, by ID
export async function getRoom(_id: ObjectID): Promise<RoomDocument> {
  const room = await db.collection(COLLECTION_ROOMS).findOne({ _id });

  return room;
}

// Get all rooms which a user can access
export async function getAllRooms(userId: ObjectID): Promise<RoomDocument[]> {
  const rooms = await db.collection(COLLECTION_ROOMS).find({ contributors: { $elemMatch: { $eq: userId } } }).toArray();

  return rooms;
}

// Returns all the stories by the user in an array
export async function getAllStories(userId: ObjectID): Promise<string[]> {
  const stories = [];
  const userRooms = await db.collection(COLLECTION_ROOMS)
      .find({ contributors: { $elemMatch: { $eq: userId } } })
      .toArray();

  for (const room of userRooms) {
    const story = room.storySoFar.join();
    stories.push(story);
  }

  return stories;
}

// Save a story
export async function saveStorySoFar(room: Room): Promise<number> {
  const roomResult = await db.collection(COLLECTION_ROOMS).findOneAndUpdate({
    _id: room.roomId,
  }, {
    $set: {
      contributors: room.contributors,
      storySoFar: room.storySoFar,
    },
  });

  return roomResult.ok;
}
