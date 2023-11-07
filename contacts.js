import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
 
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
}

export const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(el => el.id === id);
    return result || null;
}

export const removeContact = async (id) => {
   const contacts = await listContacts();
   const idx = contacts.findIndex(el => el.id === id);
   if (idx === -1) {
       return null;
   }
   const [result] = contacts.splice(idx, 1);
   await updateContacts(contacts);
   return result;
}

export const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

export const updateContactById = async (id, ...data) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(el => el.id === id);
    if (idx === -1) {
        return null;
    }
    contacts[idx] = { 
      id: contacts[idx].id,
      name: ( data[0] ? data[0] : contacts[idx].name),
      email: ( data[1] ? data[1] : contacts[idx].email),
      phone: ( data[2] ? data[2] : contacts[idx].phone),
      };
    await updateContacts(contacts);
    return contacts[idx];
}
