import Form from "Components/ContactForm/Form";
import { useHttp } from "Hooks/useHttp";
import { Contact } from "Models/Contact";
import { UpdateCreateContact } from "Models/UpdateCreateContact";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateContact = () => {
  const id = useParams().contactId;
  const navigate = useNavigate();
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const [contact, setContact] = useState<Contact>();

  const FetchUserById = useCallback(async () => {
    try {
      var response = await sendRequest(
        `https://localhost:44305/api/Contact/${id}`
      );
      setContact(response);
    } catch (err) {
      alert(error || "some unknown error has occurred");
      clearError();
    }
  }, [sendRequest, error, clearError, id]);

  useEffect(() => {
    FetchUserById();
  }, [FetchUserById]);

  const handleOnSubmit = async (contact: UpdateCreateContact) => {
    try {
      await sendRequest(
        `https://localhost:44305/api/Contact/${id}`,
        "PUT",
        contact
      );
      alert("contact updated sucessfully");
      navigate("/");
    } catch (error) {
      alert(error || "some unknown error has occurred");
      clearError();
    }
  };

  return (
    <>
      {isLoading && <div>...loading please wait</div>}
      {!isLoading && contact && (
        <Form type="Update" contact={contact} onSubmit={handleOnSubmit} />
      )}
    </>
  );
};

export default UpdateContact;
