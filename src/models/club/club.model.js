import { model } from 'mongoose';
import clubSchema from './club.schema';

const ClubModel = model('Club', clubSchema);

export default ClubModel;
