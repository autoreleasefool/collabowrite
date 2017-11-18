import * as db from '../db';
import express from 'express';

const router = express.Router();

export default function applyUsersRouter(app) {
  app.use('/users', router);
}

router.post('/signup', async (req, res) => {
  try {
    const userId = await db.signup(req.body.username, req.body.password);
    res.send(userId);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userId = await db.login(req.body.username, req.body.password);
    res.send(userId);
  } catch (e) {
    res.sendStatus(500);
  }
});