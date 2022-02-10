const request = require('supertest');

const server = 'http://localhost:8080';

describe('Route integration', function(){
    describe('/', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', function(done){
                request(server)
                .get('/convert-demo-db')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
        });

        describe('POST', () => {
            it('responds with 200 status and text/html content type', function(done){
                request(server)
                .get('/convert-sql-db')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
        });

        describe('POST', () => {
            it('responds with 200 status and text/html content type', function(done){
                request(server)
                .get('/convert-mongo-db')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
            });
        });

    })
});

