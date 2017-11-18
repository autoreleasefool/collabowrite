import applyUsersRouter from './routes/users';
import applyRoomsRouter from './routes/rooms';

export default function setupRoutes(app) {
  applyUsersRouter(app);
  applyRoomsRouter(app);
}