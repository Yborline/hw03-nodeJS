// const fs = require('fs/promises')
// const { v4: uuidv4 } = require("uuid");
let contacts = require("../models/contacts.json");
const Contact = require("..//models/schemaContacts");

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
  // const [contact] = contacts.filter((item) => item.id === contactId);
  const result = contacts.find((item) => item.id === contactId);
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
  const result = contacts.find((item) => item.id === contactId);
  contacts = contacts.filter((contact) => contact.id !== contactId);

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
  // const { name, email, phone } = req.body;
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
  const { name, email, phone } = req.body;
  const result = contacts.find((item) => item.id === contactId);
  contacts.forEach((contact) => {
    if (result) {
      contact.email = email;
      contact.name = name;
      contact.phone = phone;
    }
  });
  if (result) {
    res.status(201).json({
      status: "success",
      code: 201,
      result: result,
    });
  }
  res.status(400).json({
    status: "error",
    code: 400,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
