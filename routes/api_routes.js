// requires

const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');

// middleware
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        let notes = JSON.parse(data)
        console.log(notes)
        return res.status(200).json(notes)
    });
});

router.post('/notes', (req, res) => {
    console.log(req.body)
    req.body.id = uniqid()
    console.log(req.body)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data)
        notes.push(req.body)
        console.log(notes)

        fs.writeFile('./db/db.json', JSON.stringify(notes, null, `\n`), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            return res.status(200).json(notes)
        });

    });
});
router.delete('/notes/:id', (req, res) => {
    console.log(req.params.id)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data)
        let updatedNotes = notes.filter(note => note.id !== req.params.id)
        console.log(updatedNotes)
        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, `\n`), (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            return res.status(200).json(updatedNotes)
        });

    });
})



module.exports = router;