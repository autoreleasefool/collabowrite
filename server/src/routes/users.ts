import * as db from '../db';
import * as express from 'express';

const router = express.Router();

const ERROR_CODE = 500;

export default function applyUsersRouter(app: express.Express): void {
  app.use('/users', router);
}

router.post('/signup', async(req: express.Request, res: express.Response) => {
  try {
    const userId = await db.signUp(req.body.username, req.body.password);
    res.send(userId);
  } catch (e) {
    console.error('Could not sign up user', e);
    res.sendStatus(ERROR_CODE);
  }
});

router.post('/login', async(req: express.Request, res: express.Response) => {
  try {
    const userId = await db.logIn(req.body.username, req.body.password);
    res.send(userId);
  } catch (e) {
    console.error('Could not log in user', e);
    res.sendStatus(ERROR_CODE);
  }
});
