const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "todos" ORDER BY "id" ASC`)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    const newTodo = req.body;
    console.log(newTodo);

    const queryString = `INSERT INTO "todos" (description,status, date) VALUES
    ('${newTodo.description}', '${newTodo.status}', '${newTodo.date}');`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});


router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    const todoId = req.params.id;
    const queryString = `DELETE FROM "todos" WHERE "id" = ${todoId};`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    console.log(status, id);
    let update;

    if (status == "done") {
        update = `done`;
    } else {
        update = `not done`;
    }

    let queryString = `UPDATE "todos" SET "status"='${update}' WHERE "id" = $1;`;

    pool.query(queryString, [id])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

module.exports = router;