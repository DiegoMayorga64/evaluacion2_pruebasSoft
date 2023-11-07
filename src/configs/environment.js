import { config } from 'dotenv';

config({ path: process.env.NODE_ENV === 'test' ? './.test.env' : './.env' });

const envs = {
  mongo: {
    mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017/teams-api',
  },
  port: process.env.PORT || 3000,
  createAdmin: {
    enabled: process.env.CREATE_ADMIN || 0,
    admin: {
      email: process.env.CREATE_ADMIN_EMAIL,
      password: process.env.CREATE_ADMIN_PASSWORD,
      name: process.env.CREATE_ADMIN_NAME,
      isAdmin: true,
    },
  },
  validationStatusCode: 400,
  JWT: {
    SECRET: process.env.JWT_SECRET || '123asd',
    DEFAULT_EXPIRES: process.env.JWT_EXPIRES || '15m',
  },
};

export default envs;
