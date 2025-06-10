import React, { useState, useEffect } from 'react';
import './form.css';

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    phone: '',
    email: '',
    location: '',
    github: '',
    technicalSkills: [''],
    educations: [{ title: '', descriptions: [''] }],
    certifications: [{ title: '', descriptions: [''] }],
    achievements: [{ title: '', descriptions: [''] }]
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleListChange = (index, value, listName) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].map((item, i) =>
        i === index ? value : item
      )
    }));
  };

  const handleTitleChange = (index, value, listName) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].map((item, i) =>
        i === index ? { ...item, title: value } : item
      )
    }));
  };

  const handleDescriptionChange = (index, descIndex, value, listName) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].map((item, i) =>
        i === index ? {
          ...item,
          descriptions: item.descriptions.map((desc, j) =>
            j === descIndex ? value : desc
          )
        } : item
      )
    }));
  };

  const addListItem = (listName) => {
    setFormData(prev => ({
      ...prev,
      [listName]: [...prev[listName], listName === 'technicalSkills' ? '' : { title: '', descriptions: [''] }]
    }));
  };

  const removeListItem = (index, listName) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index)
    }));
  };

  const addDescription = (index, listName) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].map((item, i) =>
        i === index ? {
          ...item,
          descriptions: [...item.descriptions, '']
        } : item
      )
    }));
  };

  const removeDescription = (index, descIndex, listName) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].map((item, i) =>
        i === index ? {
          ...item,
          descriptions: item.descriptions.filter((_, j) => j !== descIndex)
        } : item
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image-input"
        />
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="title-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>GitHub Profile (Optional)</label>
        <input
          type="url"
          name="github"
          value={formData.github}
          onChange={handleInputChange}
          placeholder="https://github.com/username"
        />
      </div>

      <div className="form-group">
        <label>Technical Skills</label>
        {formData.technicalSkills.map((skill, index) => (
          <div key={index} className="list-item">
            <input
              type="text"
              value={skill}
              onChange={(e) => handleListChange(index, e.target.value, 'technicalSkills')}
              required
            />
            <button type="button" onClick={() => removeListItem(index, 'technicalSkills')}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addListItem('technicalSkills')}>Add Skill</button>
      </div>

      <div className="form-group">
        <label>Education</label>
        {formData.educations.map((edu, index) => (
          <div key={index} className="list-item">
            <input
              type="text"
              value={edu.title}
              onChange={(e) => handleTitleChange(index, e.target.value, 'educations')}
              placeholder="Degree/Program"
              required
            />
            <div className="description-field">
              {edu.descriptions.map((desc, descIndex) => (
                <div key={descIndex} className="description-input-group">
                  <textarea
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value, 'educations')}
                    placeholder="Description"
                    className="description-input"
                  />
                  <button type="button" onClick={() => removeDescription(index, descIndex, 'educations')}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addDescription(index, 'educations')}>Add Description</button>
            </div>
            <button type="button" onClick={() => removeListItem(index, 'educations')}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addListItem('educations')}>Add Education</button>
      </div>

      <div className="form-group">
        <label>Certifications</label>
        {formData.certifications.map((cert, index) => (
          <div key={index} className="list-item">
            <input
              type="text"
              value={cert.title}
              onChange={(e) => handleTitleChange(index, e.target.value, 'certifications')}
              placeholder="Certification Name"
              required
            />
            <div className="description-field">
              {cert.descriptions.map((desc, descIndex) => (
                <div key={descIndex} className="description-input-group">
                  <textarea
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value, 'certifications')}
                    placeholder="Description"
                    className="description-input"
                  />
                  <button type="button" onClick={() => removeDescription(index, descIndex, 'certifications')}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addDescription(index, 'certifications')}>Add Description</button>
            </div>
            <button type="button" onClick={() => removeListItem(index, 'certifications')}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addListItem('certifications')}>Add Certification</button>
      </div>

      <div className="form-group">
        <label>Achievements</label>
        {formData.achievements.map((ach, index) => (
          <div key={index} className="list-item">
            <input
              type="text"
              value={ach.title}
              onChange={(e) => handleTitleChange(index, e.target.value, 'achievements')}
              placeholder="Achievement Title"
              required
            />
            <div className="description-field">
              {ach.descriptions.map((desc, descIndex) => (
                <div key={descIndex} className="description-input-group">
                  <textarea
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value, 'achievements')}
                    placeholder="Description"
                    className="description-input"
                  />
                  <button type="button" onClick={() => removeDescription(index, descIndex, 'achievements')}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addDescription(index, 'achievements')}>Add Description</button>
            </div>
            <button type="button" onClick={() => removeListItem(index, 'achievements')}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => addListItem('achievements')}>Add Achievement</button>
      </div>

      <button type="submit" className="submit-button">Generate CV</button>
    </form>
  );
};

export default Form;