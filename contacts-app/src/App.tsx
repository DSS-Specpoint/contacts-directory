import React from "react";
import "./App.css";
import Contacts from "Pages/Contacts";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import UpdateContact from "Pages/UpdateContact";
import CreateContacts from "Pages/CreateContacts";
import MainNavigation from "Components/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Contacts />} />
          <Route path="/updateContact/:contactId" element={<UpdateContact />} />
          <Route path="/createContact" element={<CreateContacts />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
