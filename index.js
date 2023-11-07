import * as contactService from './contacts.js';
import {program} from "commander";

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');
  program.parse();
  const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
   switch (action) {
     case 'list':
      const allContacts = await contactService.listContacts();
      return console.table(allContacts);
     case 'get':
      const oneContact = await contactService.getContactById(id);
      return console.log(oneContact);
     case 'add':
      const newContact = await contactService.addContact({name, email, phone});
      return console.log(newContact);
     case 'remove':
      const deleteContact = await contactService.removeContact(id);
      return console.log(deleteContact);
      case 'update':
       const updateContact = await contactService.updateContactById(id, name, email, phone);
       return console.log(updateContact);
     default:
       console.warn('\x1B[31m Unknown action type!');
   }
 }
  
async function tryCatchHandler(clb, ...data) {
   try {
       await clb(...data);
   } catch (error) {
     console.log("Something went wrong\n", error);
   }
 };


 tryCatchHandler(invokeAction, options)