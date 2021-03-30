const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  description: { type: String, required: true },
  responsible: { type: String },
  priority: { type: String },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Item', ItemSchema);
