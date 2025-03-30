import { Contact } from "Models/Contact";
import React from "react";
import { Link } from "react-router-dom";
const ContactItem = (props: {
  item: Contact;
  onDelete: (id: string) => void;
}) => {
  const { item: contact } = props;
  return (
    <tr key={contact.id}>
      <td>{contact.firstName}</td>
      <td>{contact.lastName}</td>
      <td>{contact.email}</td>
      <td>{contact.phoneNumber}</td>
      <td>
        <Link to={`/updateContact/${contact.id}`}>
          <i className="ri-edit-box-line" title="Modify Contact"/>{"  "}
        </Link>
        <Link to="#" onClick={() => props.onDelete(contact.id)}>
        <i className="ri-delete-bin-line" title="Remove Contact"/>
        </Link>
      </td>
    </tr>
  );
};

export default ContactItem;
