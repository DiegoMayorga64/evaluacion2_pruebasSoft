import { Schema } from 'mongoose';

/**
 * Subscription mongo schema
 * - name (string): Subscription's name
 * - price (number): Subscription's price
 * - description (string): Subscription's description
 * - club (Club): The club associated to the member
 * - createdAt (ISODate): Date when the member data is created
 * - updatedAt (ISODate): Last date when the member data is updated
 */
const subscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

export default subscriptionSchema;
