const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const mongoose = require('mongoose');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Task Microservice - TaskController', () => {

  it('should create a new task', (done) => {
    const userId = mongoose.Types.ObjectId();
    chai
      .request(app)
      .post(`/api/tasks?userId=${userId}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task',
        priority: 'medium',
        dueDate: '2023-12-31',
      })
      .end(() => {
        done();
      });
  });

  it('should mark a task as complete', (done) => {
    const taskId = mongoose.Types.ObjectId();
    chai
      .request(app)
      .patch(`/api/tasks/${taskId}/complete`)
      .end(() => {
        done();
      });
  });
});
