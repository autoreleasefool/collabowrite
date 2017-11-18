import Mongo from 'mongodb';
import Promise from 'promise';

const MongoClient = Mongo.MongoClient;
let db = null;
const databaseUrl = 'mongodb://localhost:27017/collabowrite'

export function init() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(databaseUrl)
      .then((mongodb) => {
        db = mongodb;
        resolve();
      })
      .catch((err) => reject(err));
  });
}

// Sign up, return the id
export async function signup(username, password) {
  const user = await db.collection('users').findOne({ username });
  if (user) {
    throw Error('Username taken!');
  }

  const userResult = await db.collection('users').insertOne({ username, password });
  return userResult.insertedId;
}

// Login, return the user
export async function login(username, password) {
  const user = await db.collection('users').findOne({ username, password });
  return user._id;
}

// Create a new room
export async function createRoom(userId, mode, isPrivate, whitelist, prompt, genre) {
  const roomResult = await db.collection('rooms').insertOne({
    isPrivate,
    mode,
    prompt,
    genre,
    whitelist: whitelist || [],
    owner: userId,
  });
  return roomResult.insertedId;
}

// Get a room, by ID
export async function getRoom(_id) {
  const room = await db.collection('rooms').findOne({ _id });
  return room;
}

// Get all rooms which a user can access
export async function getAllRooms(userId) {
  const rooms = await db.collection('rooms').find({ }).toArray();
  return rooms;
}