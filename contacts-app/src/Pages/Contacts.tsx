import { useHttp } from "Hooks/useHttp";
import { Contact } from "Models/Contact";
import React, { useCallback, useEffect, useState } from "react";
import ContactList from "../Components/Contact/ContactList";

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const FetchUsers = useCallback(async () => {
    try {
      const response = await sendRequest("https://localhost:44305/api/Contact");
      setContacts(response);
    } catch (err) {
      alert(error || "some unknown error has occurred");
      clearError();
    }
  }, [error, clearError, sendRequest]);

  const handleOnDelete = async (id: string) => {
    try {
      await sendRequest(
        `https://localhost:44305/api/Contact/${id}`,
        "DELETE"
      );
      alert("contact deleted successfully");
      FetchUsers();
    } catch (err) {
      alert(error || "some unknown error has occurred");
      clearError();
    }
  };

  useEffect(() => {
    FetchUsers();
  }, [FetchUsers]);

  return (
    <React.Fragment>
      {isLoading && <div className="center">...loading</div>}
      {!isLoading && contacts && (
        <ContactList onDelete={handleOnDelete} contacts={contacts} />
      )}
    </React.Fragment>
  );
};

export default Contacts;
