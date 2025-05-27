const express = require('express');
const {
  addDog,
  adoptDog,
  removeDog,
  listOwnedDogs,
  listAdoptedDogs,
  listAvailableDogs
} = require('../controllers/dogController');

const authenticate = require('../middlewares/auth');
const router = express.Router();

// These routes are already prefixed with "/dogs" from app.js
router.post('/', authenticate, addDog);
router.post('/:dogId/adopt', authenticate, adoptDog);
router.delete('/:dogId', authenticate, removeDog);

router.get('/owned', authenticate, listOwnedDogs);
router.get('/adopted', authenticate, listAdoptedDogs);
router.get('/', listAvailableDogs); 

module.exports = router;
