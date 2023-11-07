import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';

const buildUser = ({ isAdmin = false }) => ({
  _id: new mongoose.Types.ObjectId(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.string.alphanumeric(8),
  isAdmin,
});

export { buildUser };
