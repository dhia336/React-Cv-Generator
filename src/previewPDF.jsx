import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';

const PreviewPDF = ({ formData }) => {
  const [previewContent, setPreviewContent] = useState(null);

  useEffect(() => {
    if (formData) {
      const imageURL = formData.image ? URL.createObjectURL(formData.image) : null;
      const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; font-size: 10px; line-height: 1.4; width: 190mm;">
          <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px;">
            ${imageURL ? `<img src="${imageURL}" alt="Profile" style="width:80px;height:80px;border-radius:12px;object-fit:cover;"/>` : ''}
            <div>
              <h1 style="margin:0 0 8px 0;font-size:1.2em;">${formData.name}</h1>
              <div style="margin-bottom: 8px;">
                <span><strong>Phone:</strong> ${formData.phone}</span><br/>
                <span><strong>Email:</strong> ${formData.email}</span><br/>
                <span><strong>Location:</strong> ${formData.location}</span>
              </div>
            </div>
          </div>
          <hr style="margin: 16px 0; border: 1px solid #ccc;" />
          <section>
            <h2 style="font-size:1em; margin-bottom: 8px;">Technical Skills</h2>
            <ul style="margin: 0; padding-left: 20px;">${formData.technicalSkills.filter(Boolean).map(skill => `<li>${skill}</li>`).join('')}</ul>
          </section>
          <hr style="margin: 16px 0; border: 1px solid #ccc;" />
          <section>
            <h2 style="font-size:1em; margin-bottom: 8px;">Educations</h2>
            <ul style="margin: 0; padding-left: 20px;">${formData.educations.filter(Boolean).map(edu => `<li>${edu}</li>`).join('')}</ul>
          </section>
          <hr style="margin: 16px 0; border: 1px solid #ccc;" />
          <section>
            <h2 style="font-size:1em; margin-bottom: 8px;">Certifications</h2>
            <ul style="margin: 0; padding-left: 20px;">${formData.certifications.filter(Boolean).map(cert => `<li>${cert}</li>`).join('')}</ul>
          </section>
          <hr style="margin: 16px 0; border: 1px solid #ccc;" />
          <section>
            <h2 style="font-size:1em; margin-bottom: 8px;">Achievements</h2>
            <ul style="margin: 0; padding-left: 20px;">${formData.achievements.filter(Boolean).map(ach => `<li>${ach}</li>`).join('')}</ul>
          </section>
        </div>
      `;
      setPreviewContent(html);
    }
  }, [formData]);

  const downloadPDF = async () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Get the actual preview content element
    const previewElement = document.querySelector('.preview-content > div');
    if (!previewElement) {
      console.error('Preview element not found');
      return;
    }

    try {
      await doc.html(previewElement, {
        callback: (doc) => {
          doc.save(`${formData.name}_CV.pdf`);
        },
        x: 10,
        y: 10,
        width: 170,
        windowWidth: 794,
        html2canvas: {
          scale: 0.5,
          useCORS: true,
          logging: true,
          backgroundColor: '#ffffff',
        },
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="preview-container">
      {previewContent && (
        <div className="preview-content">
          <div dangerouslySetInnerHTML={{ __html: previewContent }} />
          <button onClick={downloadPDF} className="download-button">Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default PreviewPDF;