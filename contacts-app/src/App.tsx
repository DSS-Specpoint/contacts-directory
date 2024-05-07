import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CreateContact } from './components/CreateContact';
import { UpdateContact } from './components/UpdateContact';
import { ContactsList } from './components/ContactsList';


function App() {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/create" className="nav-link">Create Contact</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ContactsList />} />
          <Route path="/create" element={<CreateContact />} />
          <Route path="/update/:id" element={<UpdateContact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
