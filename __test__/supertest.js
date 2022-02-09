const request = require('supertest');

const server = 'http://localhost:8080';

describe('GET /conver-demo-db', function() {
    it('responds with json', function(done){
        request(server)
          .get('/user')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
    });
});

