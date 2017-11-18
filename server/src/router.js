import applyUsersRouter from './routes/users';

export default function setupRoutes(app) {
  applyUsersRouter(app);
}