import { model } from 'mongoose';
import memberSchema from './member.schema';

const MemberModel = model('Member', memberSchema);

export default MemberModel;
