const request = require('supertest')
//const app = require('../app')
import app from '../app';
const mongoose = require('mongoose');
let server = request(app)
describe('this is a probe',()=>{
    afterAll(() => mongoose.disconnect());

    it('should be true', ()=>{
        expect(true).toBeTruthy();
        
    })

    it('should respond same object',(done)=>{
        //const resp = await request(app).get('/api/books').end(done);
        //expect(resp.status).toEqual(200);
        server
        .get("/api/books")
        .expect(200)
        .end(done);
    })

})