import { useHttp } from "Hooks/useHttp";
import { UpdateCreateContact } from "Models/UpdateCreateContact";
import { useNavigate } from "react-router-dom";
import React from "react";
import Form from "Components/ContactForm/Form";

const CreateContacts = () => {
  const { sendRequest, error, isLoading, clearError } = useHttp();
  const navigate = useNavigate();

  const handleOnSubmit = async (contact: UpdateCreateContact) => {
    try {
      const respsonse = await sendRequest(
        "https://localhost:44305/api/Contact",
        "POST",
        contact
      );
      alert("contact saved successfully");
      navigate("/");
    } catch (err) {
      alert(error || "some unknown error had occurred");
      clearError();
    }
  };

  return (
    <>
      {isLoading && <div>...loading please wait</div>}
      {!isLoading && (
        <Form
          type="Save"
          contact={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            id: "",
          }}
          onSubmit={handleOnSubmit}
        />
      )}
    </>
  );
};

export default CreateContacts;
