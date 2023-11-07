import { Factory } from 'rosie';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

const userFactory = new Factory()
  .sequence('_id', () => new mongoose.Types.ObjectId())
  .sequence('name', (i) => `name ${i}`)
  .sequence('email', () => faker.internet.email())
  .sequence('password', () => faker.string.alphanumeric(8))
  .attr('isAdmin', false);

export default userFactory;
