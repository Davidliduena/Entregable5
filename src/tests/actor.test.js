require('../models');
const app = require('../app');
const request = require('supertest');
const URL_BASE = '/api/v1/actors';
const actor = {
    firstName: "Leonardo",
    lastName: "DiCaprio",
    nationality: "USA",
    image: "https://es.web.img2.acsta.net/c_162_216/https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Leonardo_DiCaprio_in_2023_%28cropped%29.png/220px-Leonardo_DiCaprio_in_2023_%28cropped%29.png/19/07/31/17/35/5396784.jpg",
    birthday: "1974-11-11"
};
let actorId;
test("POST -> URL_BASE should return statusCode 201, and res.body.firstName === artor.firstName", async () => {
    const res = await request(app)
        .post(URL_BASE)
        .send(actor)
        actorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});
test("GET ALL -> URL_BASE should return statusCode 200, and res.body.length === 1",  async () => {
    const res = await request(app)
        .get(URL_BASE)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});
test("GET ONE -> URL_BASE/:id should return statusCode 200, and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .get(`${URL_BASE}/${actorId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});
test("PUT -> URL_BASE/:id should return statusCode 200, and res.body.firstName === bodyUpdate.firstName", async () => {
    const bodyUpdate = {
        firstName:"Dwayne"
    }
    const res = await request(app)
        .put(`${URL_BASE}/${actorId}`)
        .send(bodyUpdate)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
});
test("DELETE -> URL_BASE/:id, should return statusCode 200, and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${actorId}`)
    expect(res.statusCode).toBe(204)
});