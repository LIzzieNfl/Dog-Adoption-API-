const mongoose = require('mongoose');

// Define the Dog schema
const dogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },

  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // who added the dog
  adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // who adopted the dog (if any)
  adoptionMessage: { type: String, default: '' },
  adoptionStatus: { type: String, enum: ['available', 'adopted'], default: 'available' },
}, { timestamps: true });

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
