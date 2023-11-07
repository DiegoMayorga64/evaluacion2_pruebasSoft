import bcrypt from 'bcrypt';
import userSchema from '../../../src/models/user/user.schema';

describe('User Schema', () => {
  let user;

  bcrypt.hashSync = jest.fn().mockReturnValue('hashedPassword');

  const userModelMock = {
    create: jest.fn(),
  };

  beforeAll(() => {
    userSchema.model = userModelMock;
  });

  beforeEach(() => {
    user = new userSchema({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    });
  });

  it('should save a user with hashed password', async () => {
    userModelMock.create.mockResolvedValue(user);

    const savedUser = await user.save();

    expect(savedUser.name).toBe('Test User');
    expect(savedUser.email).toBe('test@example.com');
    expect(savedUser.password).toBe('hashedPassword');
    expect(bcrypt.hashSync).toHaveBeenCalledWith('testpassword', 10);
  });

  it('should compare passwords correctly', async () => {
    const hashedPassword = 'hashedPassword';
    userModelMock.create.mockResolvedValue(user);
    bcrypt.compareSync.mockReturnValue(true);

    const savedUser = await user.save();
    const isPasswordMatch = savedUser.comparePassword('testpassword');
    const isWrongPasswordMatch = savedUser.comparePassword('wrongpassword');

    expect(isPasswordMatch).toBe(true);
    expect(isWrongPasswordMatch).toBe(false);
  });
});