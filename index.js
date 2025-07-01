const express = require('express');
const app = express();
const PORT = 3000;

// health chech API 
app.get('/health', (req, res) => {
    res.send('Hello from Express!');
});

// reservation Data (temporary)
let reservations = [
    { id: 1, content: 'reservation1' },
    { id: 2, content: 'reservation2' }
];

// POST - make a reservation 
app.post('/reservations', (req, res) => {
    const { content } = req.body;
    if(!content) {
        return res.status(400).json({error : 'content is empty'});
    }

    const newReservation = {
        id: reservations.length + 1,
        content
    };
    
    reservations.push(newReservation);
    res.status(201).json(newReservation);
})

// GET - Retrieve all reservations
app.get('/reservations', (req, res) => {
    res.json(reservations);
});

// GET - Retrieve a single reservation by ID
app.get('/reservations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const reservation = reservations.find(r => r.id  === id);

    if(!reservation) {
        return res.status(404).json({error: 'Reservation not found'});
    }

    res.json(reservation);
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
});