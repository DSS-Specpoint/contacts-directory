import { Contact } from "Models/Contact";
import Card from "../UIElements/Card";
import React from "react";
import ContactItem from "./ContactItem";

const ContactList = (props: {
  contacts: Contact[];
  onDelete: (id: string) => void;
}) => {
  if (props.contacts.length === 0) {
    return <Card>No contacts present</Card>;
  } else {
    return (
      <table className="table table-striped mt-4 p-4">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.contacts.map((x: Contact) => (
            <ContactItem item={x} onDelete={props.onDelete} />
          ))}
        </tbody>
      </table>
    );
  }
};

export default ContactList;
