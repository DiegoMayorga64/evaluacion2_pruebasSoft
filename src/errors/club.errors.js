import { required, mustBe, requiredAndValid } from './common.messages';

const ref = 'club';

export default {
  validation: {
    name: `${ref}_validation_error`,
    messages: {
      name: required('name'),
      description: mustBe({ key: 'description', type: 'string' }),
      adminId: requiredAndValid({ key: 'adminId', type: 'user id' }),
    },
  },
  adminNotFound: {
    name: `${ref}_admin_not_found_error`,
    message: 'the admin not found',
  },
  userIsNotTheAdmin: {
    name: `${ref}_user_is_not_the_admin_error`,
    message: 'this users is not the admin of this club',
  },
};
