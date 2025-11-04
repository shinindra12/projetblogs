const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  contenu: {
    type: String,
    required: true
  },
  auteur: {
    type: String,
    default: 'Administrateur'
  },
  media: {
    type: String
  },
  typeMedia: {
    type: String,
    enum: ['image', 'video', null],
    default: null
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  dateModification: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', articleSchema);
