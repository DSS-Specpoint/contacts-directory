import { useHttp } from "Hooks/useHttp";
import { Contact } from "Models/Contact";
import React, { useCallback, useEffect, useState } from "react";
import ContactList from "../Components/Contact/ContactList";
import SearchContactForm from "Components/Contact/SearchContactForm";

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [searchType, setSearchType] = useState("firstName");
  const [searchValue, setSearchValue] = useState("");
  const [searchName, setSearchName] = useState("First Name");

  const FetchUsers = useCallback(async () => {
    try {
      const response = await sendRequest("https://localhost:44305/api/Contact");
      setContacts(response);
      setFilteredContacts(response);
    } catch (err) {
      alert(error || "some unknown error has occurred");
      clearError();
    }
  }, [error, clearError, sendRequest]);

  const handleOnDelete = async (id: string) => {
    try {
      await sendRequest(`https://localhost:44305/api/Contact/${id}`, "DELETE");
      alert("contact deleted successfully");
      FetchUsers();
    } catch (err) {
      alert(error || "some unknown error has occurred");
      clearError();
    }
  };

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchTypeChange = (type: string) => {
    setSearchType(type);
    switch (type) {
      case "firstName":
        setSearchName("First Name");
        break;
      case "lastName":
        setSearchName("Last Name");
        break;
      case "email":
        setSearchName("Email");
        break;
      case "phoneNumber":
        setSearchName("Phone Number");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    FetchUsers();
  }, [FetchUsers]);

  const handleSearch = () => {
    let contactsFilteredByType =
      contacts && contacts.length > 0 ? [...contacts] : [];
    let value = searchValue.toLowerCase();
    if (searchValue !== "") {
      contactsFilteredByType = contacts.filter((x) => {
        let tempVal = String(x[searchType]);
        return tempVal.toLowerCase().includes(value);
      });
    }
    setFilteredContacts(contactsFilteredByType);
  };

  return (
    <React.Fragment>
      {isLoading && <div className="center">...loading</div>}
      {!isLoading && contacts && (
        <div className="Container">
          <div className="row">
            <SearchContactForm
              type={searchType}
              name={searchName}
              value={searchValue}
              onSearch={handleSearch}
              onTypeChange={handleSearchTypeChange}
              onValueChange={handleSearchValueChange}
            />
          </div>
          <ContactList onDelete={handleOnDelete} contacts={filteredContacts} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Contacts;
