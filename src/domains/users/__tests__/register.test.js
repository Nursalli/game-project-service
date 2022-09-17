const { register } = require('../controller');
const repository = require('../repository');
const getVersion = require('../../../utils/version');

describe('user.controller.register', () => {
  it('happy flow', async () => {
    const mockRes = {
      json: jest.fn(),
    };

    const requestBody = {
      email: 'email@binar.com',
      firstName: 'nama',
      lastName: 'saya',
      password: 'password',
    };

    const mockRegisterRepoReturnVal = {
      password: 'hashed',
      success: true,
    };

    const registerRepository = jest.spyOn(repository, 'register');
    registerRepository.mockReturnValueOnce(mockRegisterRepoReturnVal);

    await register(
      {
        body: requestBody,
      },
      mockRes
    );

    const expectedSuccessResponse = {
      message: 'Success User Register',
      data: mockRegisterRepoReturnVal,
      error: null,
      success: true,
      version: getVersion(),
    };

    expect(mockRes.json).toBeCalledWith(expectedSuccessResponse);
  });
});
