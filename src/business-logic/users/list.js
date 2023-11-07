import UserModel from '../../models/user/user.model';

/**
 * List all users on User collection
 * @returns {User[]} List of users
 */
async function list() {
  const users = await UserModel.find({});
  return users;
}

export default list;
