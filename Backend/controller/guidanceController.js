const axios = require('axios');
const Shlok = require('../models/Shlok');
const Feedback = require('../models/Feedback');
const Stat = require('../models/Stat');

// Helper to update the global healing counter
const incrementHealingCounter = async () => {
  let stat = await Stat.findOne();
  if (!stat) {
    stat = new Stat({ totalHealed: 1 });
  } else {
    stat.totalHealed += 1;
  }
  await stat.save();
};

exports.analyzeEmotion = async (req, res) => {
  try {
    const { userInput } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: 'User input is required.' });
    }

    // 1. Call OpenRouter LLM for Emotion Classification & Distress Detection
    const prompt = `
      You are an empathy engine for an emotional well-being platform.
      Analyze the following user text and categorize their primary emotion strictly into ONE of these categories: 
      ['Anxiety', 'Depression', 'Stress', 'Low Confidence', 'Anger', 'Confusion'].
      Also, detect if the user is in severe emergency distress (e.g., mentioning self-harm, suicide, or severe trauma) and set 'isDistress' to true or false.
      Return ONLY a valid JSON object in this exact format, with no markdown formatting or extra text:
      {"emotion": "Category", "isDistress": false}

      User text: "${userInput}"
    `;

    const llmResponse = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo", // You can change this to google/gemini-pro or others available on OpenRouter
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const resultText = llmResponse.data.choices[0].message.content.trim();
    
    // Parse the JSON securely
    let analysis;
    try {
      analysis = JSON.parse(resultText);
    } catch (e) {
      // Fallback in case the LLM adds weird formatting
      const jsonMatch = resultText.match(/\{.*\}/s);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        analysis = { emotion: "Confusion", isDistress: false }; // Safe fallback
      }
    }

    // 2. Fetch a random Shlok mapping to this emotion
    const shloks = await Shlok.find({ emotionCategory: analysis.emotion });
    let selectedShlok = null;
    
    if (shloks.length > 0) {
      // Pick a random shlok from the fetched list
      selectedShlok = shloks[Math.floor(Math.random() * shloks.length)];
    } else {
      // Fallback if category doesn't exist in DB yet
      selectedShlok = await Shlok.findOne(); 
    }

    // 3. Update community stats
    await incrementHealingCounter();

    // 4. Return the structured response
    res.json({
      emotionDetected: analysis.emotion,
      isDistress: analysis.isDistress,
      guidance: selectedShlok
    });

  } catch (error) {
    console.error("Error in analyzeEmotion:", error.message);
    res.status(500).json({ error: 'Failed to process emotion.' });
  }
};

exports.submitFeedback = async (req, res) => {
  try {
    const { emotion, rating, comment } = req.body;
    const newFeedback = new Feedback({ emotion, rating, comment });
    await newFeedback.save();
    res.json({ message: "Feedback saved successfully." });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save feedback.' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stat = await Stat.findOne();
    res.json({ totalHealed: stat ? stat.totalHealed : 0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats.' });
  }
};

exports.getDailyShlok = async (req, res) => {
  try {
    // Simply fetch a random shlok for the daily feature
    const count = await Shlok.countDocuments();
    const random = Math.floor(Math.random() * count);
    const dailyShlok = await Shlok.findOne().skip(random);
    res.json(dailyShlok);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch daily shlok.' });
  }
};