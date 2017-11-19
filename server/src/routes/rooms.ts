import * as db from '../db';
import express from 'express';

const router = express.Router();

const ERROR_CODE = 500;

export default function applyRoomsRouter(app: express.Express): void {
  app.use('/rooms', router);
}

router.post('/create', async(req: express.Request, res: express.Response) => {
  try {
    const roomId = await db.createRoom(
      req.body.userId,
      req.body.mode,
      req.body.isPrivate,
      req.body.whitelist,
      req.body.prompt,
      req.body.genre
    );

    res.send(roomId);
  } catch (e) {
    console.error('Could not create room', e);
    res.sendStatus(ERROR_CODE);
  }
});

router.get('/all', async(req: express.Request, res: express.Response) => {
  try {
    const rooms = await db.getAllRooms(req.body.userId);

    const roomTypes = {
      genres: [],
      private: [],
      rooms: [],
    };

    for (const room of rooms) {
      delete room.whitelist;

      if (room.isPrivate) {
        roomTypes.private.push(room._id);
      }

      if (!(room.genre in roomTypes.genres)) {
        roomTypes[room.genre] = [];
      }

      roomTypes[room.genre].push(room._id);
    }

    res.send(rooms);
  } catch (e) {
    console.error(`Could not get rooms for ${req.body.userId}`, e);
    res.sendStatus(ERROR_CODE);
  }
});
