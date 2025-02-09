require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DOTNET_API_URL = process.env.DOTNET_API_URL; // Hämta URL från .env

app.use(express.json());
app.use(cors());

// Hämta alla skämt
app.get("/api/jokes", async (req, res) => {
    try {
        const response = await axios.get(`${DOTNET_API_URL}/jokes`);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

// Lägg till ett nytt skämt
app.post("/api/joke", async (req, res) => {
    try {
        const response = await axios.post(`${DOTNET_API_URL}/joke`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});


// Starta servern
app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
