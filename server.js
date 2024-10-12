const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Endpoint to handle chat requests
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const chatSession = model.startChat({ /* history here */ });
    const result = await chatSession.sendMessage(message);
    res.json({ response: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: 'Error processing request' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
