import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Templates.css';

const Templates = () => {
    const navigate = useNavigate();

    const templates = [
        {
            id: 'modern',
            name: 'Modern',
            description: 'Clean and professional design with a modern layout',
            preview: '🎨',
        },
        {
            id: 'classic',
            name: 'Classic',
            description: 'Traditional layout with timeless appeal',
            preview: '📄',
        },
        {
            id: 'creative',
            name: 'Creative',
            description: 'Unique design for creative professionals',
            preview: '✨',
        },
        {
            id: 'minimal',
            name: 'Minimal',
            description: 'Simple and elegant design focusing on content',
            preview: '📝',
        },
    ];

    const handleTemplateSelect = (templateId) => {
        navigate(`/create?template=${templateId}`);
    };

    return (
        <div className="templates-page">
            <h1>Choose Your Template</h1>
            <div className="templates-grid">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="template-card"
                        onClick={() => handleTemplateSelect(template.id)}
                    >
                        <div className="template-preview">{template.preview}</div>
                        <h3>{template.name}</h3>
                        <p>{template.description}</p>
                        <button className="select-template">Use Template</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates; 