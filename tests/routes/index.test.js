const request = require('supertest');
const app = require('../../src/app.js')

it('should reply the GET method /recipes with status code 200', async() => {
    const res = await request(app).get('/recipes');
    expect(res.status).toBe(200);
})

it('should reply the POST method with status code 200 if data not send', async() => {
    const res = await request(app).post('/recipes');
    expect(res.status).toBe(400);
})


it('should reply the GET method /diets with status code 200', async() => {
    const res = await request(app).get('/diets');
    expect(res.status).toBe(200);
})