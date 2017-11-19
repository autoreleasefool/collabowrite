import * as Mongo from 'mongodb';
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
  _id?: Mongo.ObjectID;
  contributors: Mongo.ObjectID[];
  genre: string;
  isPrivate: boolean;
  mode: number;
  owner: Mongo.ObjectID;
  prompt: string;
  storySoFar: string[];
  whitelist: Mongo.ObjectID[];
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
export async function signUp(username: string, password: string): Promise<Mongo.ObjectID> {
  const user = await db.collection(COLLECTION_USERS).findOne({ username });
  if (user) {
    throw Error('Username taken!');
  }

  const userResult = await db.collection(COLLECTION_USERS).insertOne({ username, password } as UserDocument);
  console.log(`Saved new user: ${username}`);

  return userResult.insertedId;
}

// Login, return the user
export async function logIn(username: string, password: string): Promise<Mongo.ObjectID> {
  const user = await db.collection(COLLECTION_USERS).findOne({ username, password });
  console.log(`Logged in user: ${username}`);

  return user._id;
}

// Create a new room
export async function createRoom(
    userId: Mongo.ObjectID,
    mode: number,
    isPrivate: boolean,
    whitelist: Mongo.ObjectID[],
    prompt: string,
    genre: string): Promise<Mongo.ObjectID> {

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
  console.log(`Created new room: ${JSON.stringify(newRoom)}`);

  return roomResult.insertedId;
}

// Get a room, by ID
export async function getRoom(_id: Mongo.ObjectID): Promise<RoomDocument> {
  const room = await db.collection(COLLECTION_ROOMS).findOne({ _id });
  console.log(`Retrieved room: ${JSON.stringify(room)}`);

  return room;
}

// Get all rooms which a user can access
export async function getAllRooms(userId: string): Promise<RoomDocument[]> {
  const user = new Mongo.ObjectID(userId);
  const whiteListedRooms = await db.collection(COLLECTION_ROOMS).find({
    isPrivate: true,
    whitelist: {
      $elemMatch: {
        $eq: user,
      },
    },
  }).toArray();
  const publicRooms = await db.collection(COLLECTION_ROOMS).find({ isPrivate: false }).toArray();
  const rooms = whiteListedRooms.concat(publicRooms);

  console.log(`Retrieved rooms for user: ${userId}, ${JSON.stringify(rooms)}`);

  return rooms;
}

// Returns all the stories by the user in an array
export async function getAllStories(userId: Mongo.ObjectID): Promise<string[]> {
  const stories = [];
  const userRooms = await db.collection(COLLECTION_ROOMS)
      .find({ contributors: { $elemMatch: { $eq: userId } } })
      .toArray();

  for (const room of userRooms) {
    const story = room.storySoFar.join();
    console.log(story);
    stories.push(story);
  }

  console.log(`Retrieved stories for user: ${userId}, ${JSON.stringify(stories)}`);

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

  console.log(`Saved story for room: ${JSON.stringify(room)}`);

  return roomResult.ok;
}
