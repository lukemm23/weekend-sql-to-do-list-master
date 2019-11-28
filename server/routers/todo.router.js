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

/*
    $.ajax({
        method: 'PUT',
        url: '/api/songs/' + $(this).data('id')
        data:  {
            direction: "up"
        }
    })
*/
// router.put('/:id', (req, res) => {
    // req.params.id = What entry do you want to update?
    // req.body.whatever = The data you want to update.
    // const id = req.params.id;
    // const direction = req.body.direction;
    // let updateVote = `upvote + 1`;

    // if (direction === "up") {
    //     updateVote = `upvote + 1`;
    // } else {
    //     updateVote = `upvote - 1`;
    // }

    // let queryString = `UPDATE "songs" SET "upvote"=${updateVote} WHERE "id" = $1;`;

    // The value in the array is providing the value for $1 above.

//     pool.query(queryString, [id])
//         .then((response) => {
//             res.sendStatus(200);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.sendStatus(500);
//         })
// });

module.exports = router;