import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';

const PreviewPDF = ({ formData }) => {
  const [previewContent, setPreviewContent] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (formData?.image) {
      const url = URL.createObjectURL(formData.image);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(null);
    }
  }, [formData?.image]);

  useEffect(() => {
    if (formData) {
      const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; font-size: 8px; line-height: 1.3; width: 100%; height: 100%; background: white; overflow: hidden;">
          <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 16px;">
            ${imageUrl ? `<img src="${imageUrl}" alt="Profile" style="width:80px;height:80px;border-radius:12px;object-fit:cover;display:block;"/>` : ''}
            <div style="flex: 1;">
              <h1 style="margin:0 0 6px 0;font-size:20px;font-weight:bold;">${formData.name}</h1>
              <div style="margin-bottom: 2px;font-size:8px;">
                <span><strong>Phone:</strong> ${formData.phone}</span><br/>
                <span><strong>Email:</strong> ${formData.email}</span><br/>
                <span><strong>Location:</strong> ${formData.location}</span><br/>
                ${formData.github ? `<span><strong>GitHub:</strong> ${formData.github}</span>` : ''}
              </div>
            </div>
          </div>
          <hr style="margin: 12px 0; border: 1px solid #ccc;" />
          <section style="margin-bottom: 12px;">
            <h2 style="font-size:10px;font-weight:bold;margin-bottom:6px;">Technical Skills</h2>
            <ul style="margin:0;padding-left:16px;font-size:8px;">
              ${formData.technicalSkills.filter(Boolean).map(skill => `<li style="margin-bottom:4px;">${skill}</li>`).join('')}
            </ul>
          </section>
          <hr style="margin: 12px 0; border: 1px solid #ccc;" />
          <section style="margin-bottom: 12px;">
            <h2 style="font-size:10px;font-weight:bold;margin-bottom:6px;">Education</h2>
            <ul style="margin:0;padding-left:16px;font-size:8px;">
              ${formData.educations.filter(Boolean).map(edu => `
                <li style="margin-bottom:6px;">
                  <strong>${edu.title}</strong>
                  ${edu.descriptions && edu.descriptions.filter(Boolean).map(desc => 
                    `<div style="color:#4b5563;font-size:7px;margin-top:1px;">${desc}</div>`
                  ).join('')}
                </li>
              `).join('')}
            </ul>
          </section>
          <hr style="margin: 12px 0; border: 1px solid #ccc;" />
          <section style="margin-bottom: 12px;">
            <h2 style="font-size:10px;font-weight:bold;margin-bottom:6px;">Certifications</h2>
            <ul style="margin:0;padding-left:16px;font-size:8px;">
              ${formData.certifications.filter(Boolean).map(cert => `
                <li style="margin-bottom:6px;">
                  <strong>${cert.title}</strong>
                  ${cert.descriptions && cert.descriptions.filter(Boolean).map(desc => 
                    `<div style="color:#4b5563;font-size:7px;margin-top:1px;">${desc}</div>`
                  ).join('')}
                </li>
              `).join('')}
            </ul>
          </section>
          <hr style="margin: 12px 0; border: 1px solid #ccc;" />
          <section style="margin-bottom: 12px;">
            <h2 style="font-size:10px;font-weight:bold;margin-bottom:6px;">Achievements</h2>
            <ul style="margin:0;padding-left:16px;font-size:8px;">
              ${formData.achievements.filter(Boolean).map(ach => `
                <li style="margin-bottom:6px;">
                  <strong>${ach.title}</strong>
                  ${ach.descriptions && ach.descriptions.filter(Boolean).map(desc => 
                    `<div style="color:#4b5563;font-size:7px;margin-top:1px;">${desc}</div>`
                  ).join('')}
                </li>
              `).join('')}
            </ul>
          </section>
        </div>
      `;
      setPreviewContent(html);
    }
  }, [formData, imageUrl]);

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
        width: 190,
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