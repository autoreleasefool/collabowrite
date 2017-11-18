import * as db from '../db';
import express from 'express';

const router = express.Router();

export default function applyRoomsRouter(app) {
  app.use('/rooms', router);
}

router.post('/create', async (req, res) => {
  try {
    const roomId = await db.createRoom(
      req.body.userId,
      req.body.mode,
      req.body.isPrivate,
      req.body.whitelist,
      req.body.prompt,
      req.body.genre,
    );

    res.send(roomId);
  } catch (e) {
    console.error('Could not create room', e);
    res.sendStatus(500);
  }
});

router.get('/all', async (req, res) => {
  try {
    const rooms = await db.getAllRooms(req.body.userId);

    roomTypes = {
      'genres': [],
      'private': [],
      'rooms': [],
    }

    for (const room in rooms) {
      delete room.whitelist;

      if (room.isPrivate) {
        roomTypes.private.push(room._id);
      }

      if (!(room.genre in roomTypes.genres)) {
        roomTypes[room.genre] = []
      }

      roomTypes[room.genre].push(room._id);
    }

    res.send(rooms);
  } catch (e) {
    console.error(`Could not get rooms for ${req.body.userId}`, e);
    res.sendStatus(500);
  }
});