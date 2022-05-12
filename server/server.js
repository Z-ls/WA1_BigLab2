const express = require('express');
const dao = require('./dao');

const PORT = 3001;

app = new express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Hello, World! from http://localhost:${PORT}`);
});

app.get('/api/films', async (req, res) => {
    await dao.listFilms()
    .then(film => res.json(film))
    .catch(res.status(500).end);
    
});

app.get('/api/film/:id', async (req, res) => {
    await dao.getFilmById(req.params.id)
    .then(film => res.json(film))
    .catch(res.status(500).end);
})

app.post('/api/film', async (req, res) => {
    await dao.addFilm(req.body)
    .then(id => req.json({"id": id}))
    .catch(res.status(500).end);
});

app.put('/api/film/:id', async (req, res) => {
    if (Number(req.params.id) === Number(req.body.id)) {
        await dao.updateFilm(req.body)
        .then(id => res.json(req.body))
        .catch(err => res.send(err));
    } else 
    return res.status(422).send("Validation failed.");
});

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));