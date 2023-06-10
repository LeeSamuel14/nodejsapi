const express = require('express');
const app = express();
const PORT = 3000;

//routes
app.get('/', (req, res) => {
    res.send({
        name: "Lee",
        age: 28
    });
});

app.listen(PORT, () => {
    console.log(`Node API app is running on ${PORT}`);
});