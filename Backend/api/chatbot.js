app.post('/api/chatbot', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Log message for debugging
        console.log("Received message:", message);

        // Generate content with the correct payload structure
        const response = await model.generateContent({
            prompt: {
                text: message, // Adjust structure if necessary
            },
        });

        // Log the full response for debugging
        console.log("Full response from generative AI:", response);

        // Safely extract the generated response text
        const generatedText = response?.promptResponse?.text || 'No response generated.';
        res.status(200).json({ reply: generatedText });
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        res.status(500).json({ error: 'Failed to process your request' });
    }
});
