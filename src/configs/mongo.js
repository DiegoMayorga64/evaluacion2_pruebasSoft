import mongoose from 'mongoose';
import envs from './environment';
import initialData from './initial-data';
import log from './log';

const { mongo } = envs;

/**
 * Load all models
 */
async function loadModels() {
  await import('../models/user/user.model');
  await import('../models/member/member.model');
  await import('../models/club/club.model');
}

let mongoInstance;

/**
 * Connect to mongo database
 * @throws Exit the process with error -1
 */
async function connect() {
  if (!mongoInstance) {
    console.log(mongo.mongo_uri);
    return mongoose
      .connect(mongo.mongo_uri)
      .then(async (mongo) => {
        await loadModels();
        await initialData();
        mongoInstance = mongo;
      })
      .catch((error) => {
        log.error(error);
        process.exit(-1);
      });
  }
}

export default connect;
