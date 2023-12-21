const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app'); // Adjust the path accordingly

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Microservice - UserController', () => {
  it('should get all users', (done) => {
    chai
      .request(app)
      .get('/api/users')
      .end(() => {
        done();
      });
  });

  it('should create a new user', (done) => {
    chai
      .request(app)
      .post('/api/users')
      .send({
        username: 'testUser',
        email: 'test@example.com',
        type: 'default',
      })
      .end(() => {
        done();
      });
  });
});
