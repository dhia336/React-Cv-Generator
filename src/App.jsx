import { useState } from 'react';
import './App.css';
import Navbar from './navbar.jsx';
import Form from './form.jsx';
import PreviewPDF from './previewPDF.jsx';

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        <Form onSubmit={handleFormSubmit} />
        {formData && <PreviewPDF formData={formData} />}
      </div>
    </>
  );
}

export default App;
