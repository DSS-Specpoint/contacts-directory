import React, { ChangeEvent} from "react";

const SearchContactForm = (props: {
  type: string;
  value: string;
  name: string;
  onSearch: () => void;
  onValueChange : (value:string) => void;
  onTypeChange: (type:string) => void;
}) => {
  

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onValueChange(e.target.value);
  };

  const handleSearchTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onTypeChange(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.onSearch();
  };

  return (
    <form className="d-flex" role="search">
      <input
        className="form-control"
        value={props.value}
        placeholder={`search by ${props.name}`}
        type="search"
        aria-label="Search"
        onChange={handleSearchNameChange}
      />
      <select
        className="form-select"
        onChange={handleSearchTypeChange}
        value={props.type}
      >
        <option value={"firstName"}>First Name</option>
        <option value={"lastName"}>Last Name</option>
        <option value={"email"}>Email</option>
        <option value={"phoneNumber"}>Phone Number</option>
      </select>
      <button
        className="btn btn-outline-success"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  );
};

export default SearchContactForm;
