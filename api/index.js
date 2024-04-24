import express from 'express';

const app = express();

app.listen(3000, () => {
    console.log("Server us running on http://localhost:3000");
});