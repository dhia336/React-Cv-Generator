import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './navbar.jsx';
import Form from './form.jsx';
import PreviewPDF from './previewPDF.jsx';
import Home from './Home.jsx';

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create"
            element={
              <div className="app-container">
                <Form onSubmit={handleFormSubmit} />
                {formData && <PreviewPDF formData={formData} />}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
