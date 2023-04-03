const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./db/contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log(`🚀 ~ invokeAction ~ allContacts:`, allContacts);
      break;

    case "get":
      const contactByID = await getContactById(id);
      console.log(`🚀 ~ invokeAction ~ contactByID:`, contactByID);
      break;

    case "add":
      const newContactsList = await addContact({ name, email, phone });
      console.log(`🚀 ~ invokeAction ~ newContactsList:`, newContactsList);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      console.log(`🚀 ~ invokeAction ~ deleteContact:`, deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
