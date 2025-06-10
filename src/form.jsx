import React, { useState } from 'react';
import './form.css';

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    phone: '',
    email: '',
    location: '',
    technicalSkills: [],
    educations: [],
    certifications: [],
    achievements: [],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required.';
    if (!formData.location.trim()) newErrors.location = 'Location is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleListChange = (name, index, value) => {
    const updatedList = [...formData[name]];
    updatedList[index] = value;
    setFormData({ ...formData, [name]: updatedList });
  };

  const handleAddItem = (name) => {
    setFormData({ ...formData, [name]: [...formData[name], ''] });
  };

  const handleRemoveItem = (name, index) => {
    const updatedList = formData[name].filter((_, i) => i !== index);
    setFormData({ ...formData, [name]: updatedList });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <span className="error">{errors.location}</span>}
      </div>

      {['technicalSkills', 'educations', 'certifications', 'achievements'].map((field) => (
        <div key={field} className="form-group">
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
          {formData[field].map((item, index) => (
            <div key={index} className="list-item">
              <input
                type="text"
                value={item}
                onChange={(e) => handleListChange(field, index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveItem(field, index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddItem(field)}>
            Add {field.charAt(0).toUpperCase() + field.slice(1)}
          </button>
        </div>
      ))}

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default Form;