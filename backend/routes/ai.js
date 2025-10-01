const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

const genAI = new GoogleGenerativeAI('AIzaSyDqxbID4YBbRnVrVMfvuAgRLAyrjG-hs48');

// POST /api/ai/suggest
router.post('/suggest', async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ error: 'Title required' });
    }

    // Initialize Gemini model (free tier: gemini-1.5-flash)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Construct prompt for Gemini
    const prompt = `
      You are a form schema generator. Based on the provided form title and optional description, generate a JSON schema for a form with appropriate fields. Each field should have:
      - id: unique string (e.g., "field1")
      - type: one of ["text", "number", "select", "checkbox", "radio", "date", "file"]
      - label: descriptive string
      - required: boolean
      - min/max: for number fields (optional)
      - options: for select/radio fields (optional, array of strings)
      Return only the JSON object with a "fields" array. Example:
      {
        "fields": [
          {"id": "field1", "type": "text", "label": "Name", "required": true},
          {"id": "field2", "type": "select", "label": "Category", "required": true, "options": ["A", "B"]}
        ]
      }
      Title: ${title}
      Description: ${description || 'No description provided'}
    `;

    // Generate schema
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    let schema;
    try {
      schema = JSON.parse(responseText);
      if (!schema.fields || !Array.isArray(schema.fields)) {
        throw new Error('Invalid schema format');
      }
    } catch (err) {
      console.error('AI response parsing error:', err.message, responseText);
      return res
        .status(500)
        .json({ error: 'Failed to parse AI-generated schema' });
    }

    res.status(200).json({ schema });
  } catch (err) {
    console.error('AI suggest error:', err.message, err.stack);
    res
      .status(500)
      .json({ error: `Failed to generate schema: ${err.message}` });
  }
});

module.exports = router;
