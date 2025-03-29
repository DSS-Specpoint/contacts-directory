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
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {props.contacts.map((x: Contact) => (
            <ContactItem item={x} onDelete={props.onDelete}/>
          ))}
        </tbody>
      </table>
    );
  }
};

export default ContactList;
