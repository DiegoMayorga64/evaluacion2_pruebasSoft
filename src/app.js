import Express from 'express';
import envs from './configs/environment';
import userRouter from './routers/user.router';
import clubRouter from './routers/club.router';
import authRouter from './routers/auth.router';
import connectMongo from './configs/mongo';
import log from './configs/log';

const { port } = envs;

const app = Express();

function serverConfigs() {
  app.use(Express.json());
}

function loadRoutes() {
  app.use('/users', userRouter);
  app.use('/clubs', clubRouter);
  app.use('/auth', authRouter);
}

async function startServer() {
  serverConfigs();
  loadRoutes();
  await connectMongo();

  app.listen(port, () => {
    console.log(`🚀 Server running on port: ${port} 🚀`);
    log.info('Server running');
  });
}

startServer();
