require('../models');
const request = require('supertest');
const app = require('../app');
const URL_BASE = '/api/v1/movies'
const movie = {
    name:"El rey de la comedia",
    image:"https://https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsXlMYWsZz-4P2MLeBgEx_xP5LXG90MGDqraWiEE6GGw&s.wikimedia.org/wikipedia/commons/thumb/3/3d/Terminator_%28franchise_logo%29.svg/420px-Terminator_%28franchise_logo%29.svg.png",
    synopsis:"En ella Cuenta la historia de Rupert Pupkin (Robert De Niro), un comediante desesperado por conseguir una recomendación de su ídolo, el famoso cómico Jerry Langford (Jerry Lewis). La película trata sobre el culto a la celebridad y la cultura de los medios estadounidenses. interpreta al Terminator, un ciborg asesino enviado a través del tiempo desde el año 2029 a 1984 para asesinar a Sarah Connor",
    releaseYear:"1982"
};
let movieId
test("POST -> URL_BASE should return statusCode 201, and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(URL_BASE)
        .send(movie)
        movieId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});
test("GET ALL-> URL_BASE should return statusCode 200, and res.body.length === 1", async () => {
    const res = await request(app)
        .get(URL_BASE)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});
test("GET ONE -> URL_BASE/:id should return statusCode 200, and  res.body.name === movie.name", async () => {
    const res = await request(app)
        .get(`${URL_BASE}/${movieId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});
test("PUT -> URL_BASE/:id should return statusCode 200, and res.body.name === bodyUpdate.name", async () => {
    const bodyUpdate = {
        name:"Comedia"
    }
    const res = await request(app)
        .put(`${URL_BASE}/${movieId}`)
        .send(bodyUpdate)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
});
test("DELETED -> URL_BASE/:id should return statusCode 204", async () => {
    const res = await request(app)
        .delete(`${URL_BASE}/${movieId}`)
    expect(res.statusCode).toBe(204)
});