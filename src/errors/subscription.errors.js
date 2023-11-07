import { required, mustBe, requiredAndValid } from './common.messages';

const ref = 'subscription';

export default {
  validation: {
    name: `${ref}_validation_error`,
    messages: {
      name: required('name'),
      price: requiredAndValid({ key: 'price', type: 'number' }),
      description: mustBe({ key: 'dni', type: 'string' }),
    },
  },
  clubNotFound: {
    name: `${ref}_club_not_found_error`,
    message: 'the club not found',
  },
};
