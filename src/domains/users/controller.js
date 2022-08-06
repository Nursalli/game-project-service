const jwt = require('jsonwebtoken');

const { SuccessResponse } = require('../../utils/response');
const userRepository = require('./repository');

module.exports = {
  register: async (req, res) => {
    const payload = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    };
    
    const result = await userRepository.register(payload);

    result.password = undefined;

    const response = new SuccessResponse('Success User Register', result);

    res.json(response);
  },

  login: async (req, res) => {
    const email = req.body.email;
    const plainPassword = req.body.password;

    const user = await userRepository.login(email, plainPassword);

    const token = jwt.sign(
      {
        sub: user.id.toString(),
        iss: 'mock-platinum.app.com',
        aud: 'some-client.app.com',
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '24h'
      }
    );

    const response = new SuccessResponse('Success Login', {userId: user.id, token});

    res.json(response);
  }
}