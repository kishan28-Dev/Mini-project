const mongoose = require('mongoose');

const shlokSchema = new mongoose.Schema({
  emotionCategory: { 
    type: String, 
    required: true,
    enum: ['Anxiety', 'Depression', 'Stress', 'Low Confidence', 'Anger', 'Confusion'] 
  },
  chapter: Number,
  verse: Number,
  sanskrit: String,
  transliteration: String,
  meaning: String,
  practicalSteps: [String],
  dailySuggestion: String
});

module.exports = mongoose.model('Shlok', shlokSchema);