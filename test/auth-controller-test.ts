import { expect } from 'chai'
import * as request from 'supertest'

import App from '../src/app'

const app = new App();

describe('auth-controller-test', () => {
  const req = request(app.application);
  
  it('success sign up', async (done) => {
    const res = await req.post('/api/v1/auth/sign-up')
      .send({ name: 'test5', password: '123' })
      .expect(201);
    done();
  });

  it('success sign in', async (done) => {
    const res = await req.post('/api/v1/auth/sign-in')
      .send({ name: 'test', password: '123' })
      .expect(200);
    expect(res.body.token).to.exist;
    done();
  })
});