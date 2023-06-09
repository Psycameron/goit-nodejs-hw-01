const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function updateList(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactByID = allContacts.find((contact) => contact.id === contactId);
  return contactByID || null;
}

async function addContact({ name, email, phone }) {
  const allContacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts = [...allContacts, newContacts];
  await updateList(contacts);
  return contacts;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const newContactsList = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  await updateList(newContactsList);
  return newContactsList;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
