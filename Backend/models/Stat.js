const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  totalHealed: { type: Number, default: 0 }
});

module.exports = mongoose.model('Stat', statSchema);