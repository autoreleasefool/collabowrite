import { Express } from 'express';
import applyUsersRouter from './routes/users';
import applyRoomsRouter from './routes/rooms';

export default function setupRoutes(app: Express): void {
  applyUsersRouter(app);
  applyRoomsRouter(app);
}
