const Dog = require('../models/dog'); 
const STATUS = require('../statusCodes'); 

const addDog = async (req, res) => {
  try {
    const newDog = new Dog(req.body); // Assuming you create the dog from req.body
    await newDog.save();
    res.status(STATUS.CREATED).json({ message: 'Dog added successfully', dog: newDog });
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error adding dog', error });
  }
};

const removeDog = async (req, res) => {
  try {
    const { dogId } = req.params;

    const dog = await Dog.findById(dogId);
    if (!dog) {
      return res.status(STATUS.NOT_FOUND).json({ message: 'Dog not found' });
    }

    if (dog.owner.toString() !== req.user._id.toString()) {
      return res.status(STATUS.FORBIDDEN).json({ message: 'Not authorized to delete this dog' });
    }

    await Dog.findByIdAndDelete(dogId);
    res.json({ message: 'Dog removed successfully', dog });
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error removing dog', error });
  }
};

const adoptDog = async (req, res) => {
  try {
    const { dogId } = req.params;
    const adopterId = req.user._id;
    const { adoptionMessage } = req.body;

    const dog = await Dog.findById(dogId);
    if (!dog) {
      return res.status(STATUS.NOT_FOUND).json({ message: 'Dog not found' });
    }

    if (dog.adoptionStatus === 'adopted') {
      return res.status(STATUS.BAD_REQUEST).json({ message: 'Dog is already adopted' });
    }

    dog.adoptedBy = adopterId;
    dog.adoptionStatus = 'adopted';
    dog.adoptionMessage = adoptionMessage || '';

    await dog.save();

    res.json({ message: 'Dog adopted successfully', dog });
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error adopting dog', error });
  }
};

const listOwnedDogs = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const { breed, page = 1, limit = 10 } = req.query;

    const filter = { owner: ownerId };
    if (breed) filter.breed = breed;

    const skip = (page - 1) * limit;

    const dogs = await Dog.find(filter).skip(skip).limit(parseInt(limit));
    const total = await Dog.countDocuments(filter);

    res.json({ page: parseInt(page), limit: parseInt(limit), total, dogs });
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error listing owned dogs', error });
  }
};

const listAdoptedDogs = async (req, res) => {
  try {
    const adopterId = req.user._id;
    const { breed, page = 1, limit = 10 } = req.query;

    const filter = { adoptedBy: adopterId };
    if (breed) filter.breed = breed;

    const skip = (page - 1) * limit;

    const dogs = await Dog.find(filter).skip(skip).limit(parseInt(limit));
    const total = await Dog.countDocuments(filter);

    res.json({ page: parseInt(page), limit: parseInt(limit), total, dogs });
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error listing adopted dogs', error });
  }
};

const listAvailableDogs = async (req, res) => {
  try {
    const dogs = await Dog.find({ adoptionStatus: 'available' });
    res.json(dogs);
  } catch (error) {
    res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching available dogs', error });
  }
};

module.exports = {
  addDog,
  removeDog,
  adoptDog,
  listOwnedDogs,
  listAdoptedDogs,
  listAvailableDogs,
};
