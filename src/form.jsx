import React, { useState, useEffect } from 'react';
import './form.css';

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    phone: '',
    email: '',
    location: '',
    technicalSkills: [''],
    educations: [{ title: '', description: '' }],
    certifications: [{ title: '', description: '' }],
    achievements: [{ title: '', description: '' }],
  });

  const [errors, setErrors] = useState({});
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    // Update preview whenever form data changes
    if (formData.name || formData.email || formData.phone || formData.location) {
      onSubmit(formData);
    }
  }, [formData, onSubmit]);

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

  const handleListChange = (name, index, field, value) => {
    const updatedList = [...formData[name]];
    if (name === 'technicalSkills') {
      updatedList[index] = value;
    } else {
      updatedList[index] = { ...updatedList[index], [field]: value };
    }
    setFormData({ ...formData, [name]: updatedList });
  };

  const handleAddItem = (name) => {
    const newItem = name === 'technicalSkills' ? '' : { title: '', description: '' };
    setFormData({ ...formData, [name]: [...formData[name], newItem] });
  };

  const handleRemoveItem = (name, index) => {
    const updatedList = formData[name].filter((_, i) => i !== index);
    setFormData({ ...formData, [name]: updatedList });
  };

  const toggleDescription = (name, index) => {
    const key = `${name}-${index}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderDescriptionField = (name, index, item) => {
    const key = `${name}-${index}`;
    const isExpanded = expandedItems[key];
    const hasDescription = item.description && item.description.trim() !== '';

    return (
      <div className="description-container">
        {!isExpanded && !hasDescription && (
          <button
            type="button"
            onClick={() => toggleDescription(name, index)}
            className="add-description-button"
          >
            + Add Description
          </button>
        )}
        {(isExpanded || hasDescription) && (
          <div className="description-field">
            <textarea
              value={item.description}
              onChange={(e) => handleListChange(name, index, 'description', e.target.value)}
              placeholder={`Enter ${name.slice(0, -1)} description (optional)`}
              className="description-input"
            />
            <button
              type="button"
              onClick={() => toggleDescription(name, index)}
              className="toggle-description-button"
            >
              {isExpanded ? 'Hide' : 'Show'} Description
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <form className="form-container">
      <div className="form-group">
        <label htmlFor="image">Profile Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="file-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="title-input"
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
          placeholder="+1 (555) 000-0000"
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
          placeholder="john@example.com"
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
          placeholder="City, Country"
        />
        {errors.location && <span className="error">{errors.location}</span>}
      </div>

      <div className="form-group">
        <label>Technical Skills:</label>
        {formData.technicalSkills.map((skill, index) => (
          <div key={index} className="list-item">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleListChange('technicalSkills', index, null, e.target.value)}
              placeholder="Enter technical skill"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem('technicalSkills', index)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem('technicalSkills')}
          className="add-button"
        >
          Add Technical Skill
        </button>
      </div>

      {['educations', 'certifications', 'achievements'].map((field) => (
        <div key={field} className="form-group">
          <label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:</label>
          {formData[field].map((item, index) => (
            <div key={index} className="list-item-with-description">
              <div className="list-item-header">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleListChange(field, index, 'title', e.target.value)}
                  placeholder={`Enter ${field.slice(0, -1)} title`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(field, index)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
              {renderDescriptionField(field, index, item)}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem(field)}
            className="add-button"
          >
            Add {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
          </button>
        </div>
      ))}
    </form>
  );
};

export default Form;