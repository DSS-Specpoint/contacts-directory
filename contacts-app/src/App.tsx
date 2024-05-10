import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CreateContact } from './components/Contact-Create';
import { UpdateContact } from './components/Contact-Update';
import { ContactsList } from './components/Contact-List';


function App() {
  return (
    <Router>
      <div className="container mt-4">
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