import { required, mustBe, requiredAndValid } from './common.messages';

const ref = 'member';

export default {
  validation: {
    name: `${ref}_validation_error`,
    messages: {
      name: required('name'),
      lastName: required('lastName'),
      email: requiredAndValid({ key: 'email', type: 'email' }),
      dni: mustBe({ key: 'dni', type: 'string' }),
      nickname: mustBe({ key: 'nickname', type: 'string' }),
    },
  },
  clubNotFound: {
    name: `${ref}_club_not_found_error`,
    message: 'the club not found',
  },
};
