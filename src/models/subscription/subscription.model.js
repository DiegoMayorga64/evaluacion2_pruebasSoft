import { model } from 'mongoose';
import subscriptionSchema from './subscription.schema';

const SubscriptionModel = model('Subscription', subscriptionSchema);

export default SubscriptionModel;
