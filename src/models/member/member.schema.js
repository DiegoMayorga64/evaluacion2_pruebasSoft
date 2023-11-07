import { Schema } from 'mongoose';

/**
 * Member mongo schema
 * - name (string): Member's name
 * - lastName (string): Member's last name
 * - email (string): Member's email
 * - dni (string): Member's DNI
 * - nickname (string): Member's nickname or alias
 * - club (Club): The club associated to the member
 * - createdAt (ISODate): Date when the member data is created
 * - updatedAt (ISODate): Last date when the member data is updated
 */
const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    dni: {
      type: String,
      index: true,
    },
    nickname: {
      type: String,
    },
    clubId: {
      type: Schema.Types.ObjectId,
      ref: 'Club',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

memberSchema.index({ email: 1, clubId: 1 }, { unique: true });

export default memberSchema;
