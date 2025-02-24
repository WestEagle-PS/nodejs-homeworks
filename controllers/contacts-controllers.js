const { Contact } = require('../models/contact');
const { ctrlWrapper } = require('../utils');
const { HttpError } = require('../helpers');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const result = await Contact.find({ owner, favorite: true }, '-createdAt -updatedAp', { skip, limit }).populate('owner');
    res.json(result);
  }

  const result = await Contact.find({ owner }, '', { skip, limit });
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findOne({ _id: id });
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(result);
};

const updateContactFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findByIdAndDelete(id);
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  // res.json(result);
  // res.status(204).send();
  res.json({
    message: `contact deleted`,
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  updateContactFavorite: ctrlWrapper(updateContactFavorite),
  deleteContactById: ctrlWrapper(deleteContactById),
};
