import { Schema } from 'mongoose';

/**
 * Manager mongo schema
 * - userId (string): Related id of the user in user collection
 * - role (string): Role of the manager
 * - createdAt (ISODate): Date when the club data is created
 * - updatedAt (ISODate): Last date when the club data is updated
 */
const managerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

/**
 * Club mongo schema
 * - name (string): Name of the club
 * - description (string): A club description
 * - managers (managerSchema[]): List of managers
 * - admin (string): Admin user id (created by)
 * - createdAt (ISODate): Date when the club data is created
 * - updatedAt (ISODate): Last date when the club data is updated
 */
const clubSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    managers: [managerSchema],
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default clubSchema;
