require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { SessionsClient } = require('@google-cloud/dialogflow');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// MongoDB Schema for Contact Form
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

// Google Dialogflow Client
const dialogflowClient = new SessionsClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const projectId = 'your-google-cloud-project-id'; // Replace with your Google Cloud project ID
const sessionId = 'portfolio-session';

// Chatbot Endpoint
app.post('/api/chatbot', async (req, res) => {
  const { message } = req.body;

  const sessionPath = dialogflowClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await dialogflowClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({ reply: result.fulfillmentText });
  } catch (error) {
    console.error('Error with Dialogflow:', error);
    res.status(500).json({ reply: 'Sorry, I encountered an error.' });
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'An error occurred. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});