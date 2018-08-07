import { expect } from 'chai'
import * as request from 'supertest'
import App from '../src/app'

const app = new App();

describe('app-test', () => {
  const req = request(app.application);
  
  it('GET /', async () => {
    const res = await req.get('/').expect(200)
    expect(res.text).to.equal('Hello World!')
  });
  
  it('GET /not_found', async () => {
    const res = await req.get('/not_found').expect(404)
    expect(res.body.message).to.equal('Not Found')
  })
});