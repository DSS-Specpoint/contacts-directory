import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IContactType } from "../model/contact";
import { getAllContacts, deleteContact } from "../services/api-call";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

export const ContactsList: React.FC = () => {
  // State variables
  const [contacts, setContacts] = useState<IContactType[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<IContactType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contactsPerPage] = useState<number>(5);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  // Fetch contacts on initial render
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const contactsData: any = await getAllContacts();
        setContacts(contactsData.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch contacts");
        setLoading(false);
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  // Filter contacts based on search term
  useEffect(() => {
    const filtered = contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        contact.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  // Delete a contact
  const deleteSelectedContact = async (id: number) => {
    if (id && window.confirm("Are you sure want to delete the contact!")) {
      try {
        await deleteContact(id);
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.contactId !== id)
        );
        alert("Contact deleted!");
      } catch (error) {
        console.error("Failed to delete contact", error);
        alert("Failed to delete contact");
      }
    }
  };

  // Handle sorting of contacts
  const handleSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sort the filtered contacts based on sorting configuration
  const sortedContacts = () => {
    const sorted = [...filteredContacts];
    if (sortConfig !== null) {
      sorted.sort((a, b) => {
        const key = sortConfig.key as keyof IContactType;
        const propA = a[key];
        const propB = b[key];

        if (typeof propA === "string" && typeof propB === "string") {
          const valueA = propA.toLowerCase();
          const valueB = propB.toLowerCase();

          if (valueA < valueB) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (valueA > valueB) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sorted;
  };

  // Pagination
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = sortedContacts().slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Render loading state if data is still loading
  if (loading) return <div>Loading...</div>;
  // Render error message if there's an error fetching data
  if (error) return <div className="alert alert-danger">{error}</div>;

  // Render the contacts list
  return (
    <div className="container mt-5">
      {/* Create contact button */}
      <div className="mb-3">
        <Link to="/create" className="btn btn-primary mb-3">
          Create Contact
        </Link>
      </div>
      {/* Heading */}
      <h2 className="mb-4">Contacts List</h2>
      {/* Search input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Contacts table */}
      <table className="table table-striped">
        <thead>
          <tr>
            {/* Sortable headers */}
            <th onClick={() => handleSort("firstName")}>
              First Name{" "}
              {sortConfig &&
                sortConfig.key === "firstName" &&
                (sortConfig.direction === "ascending" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                ))}
            </th>
            <th onClick={() => handleSort("lastName")}>
              Last Name{" "}
              {sortConfig &&
                sortConfig.key === "lastName" &&
                (sortConfig.direction === "ascending" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                ))}
            </th>
            <th onClick={() => handleSort("email")}>
              Email{" "}
              {sortConfig &&
                sortConfig.key === "email" &&
                (sortConfig.direction === "ascending" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                ))}
            </th>
            <th onClick={() => handleSort("phone")}>
              Phone{" "}
              {sortConfig &&
                sortConfig.key === "phone" &&
                (sortConfig.direction === "ascending" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                ))}
            </th>
            <th onClick={() => handleSort("address")}>
              Address{" "}
              {sortConfig &&
                sortConfig.key === "address" &&
                (sortConfig.direction === "ascending" ? (
                  <FaSortUp />
                ) : (
                  <FaSortDown />
                ))}
            </th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* Render contacts */}
          {currentContacts.length > 0 ? (
            currentContacts.map((contact) => (
              <tr key={contact.contactId}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.address}</td>
                <td>
                  {/* Edit button */}
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/update/${contact.contactId}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
                <td>
                  {/* Delete button */}
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => deleteSelectedContact(contact.contactId)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            // Render if no contacts available
            <tr>
              <td colSpan={6} className="text-center">
                No contacts available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(filteredContacts.length / contactsPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

