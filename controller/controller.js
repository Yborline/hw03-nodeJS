const { Contact } = require("..//models/schemaContacts");

const listContacts = async (req, res, next) => {
  const result = await Contact.find({});
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contacts: result,
    },
  });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  // const result = await Contact.findOne({ _id: contactId });
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `contact with id=${contactId} not found`,
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    res.status(400).json({
      status: "Not Found",
      code: 400,
    });
  }
  res.status(201).json({
    status: "success",
    code: 201,
    result: result,
  });
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (result) {
    res.status(201).json({
      status: "success",
      code: 201,
      result: result,
    });
  }
  res.status(500).json({
    status: "error",
    code: 500,
  });
};

const updatFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
  res.status(201).json({
    status: "success",
    code: 200,
    result: result,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updatFavorite,
};
