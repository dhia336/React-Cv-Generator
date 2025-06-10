import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Arial',
    fontSize: 10,
    padding: 20,
    lineHeight: 1.4,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    objectFit: 'cover',
    marginRight: 16,
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  list: {
    marginLeft: 20,
  },
  item: {
    marginBottom: 8,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 9,
    color: '#4b5563',
    marginTop: 2,
  },
});

const PDFDocument = ({ formData }) => {
  if (!formData) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No data provided</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          {formData.image && <Image src={URL.createObjectURL(formData.image)} style={styles.image} />}
          <View>
            <Text style={{ fontSize: 14, marginBottom: 8 }}>{formData.name}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Phone:</Text> {formData.phone}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {formData.email}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Location:</Text> {formData.location}</Text>
          </View>
        </View>

        {/* Technical Skills Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Technical Skills</Text>
          <View style={styles.list}>
            {formData.technicalSkills.map((skill, index) => (
              <Text key={index}>- {skill}</Text>
            ))}
          </View>
        </View>

        {/* Educations Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Education</Text>
          <View style={styles.list}>
            {formData.educations.map((edu, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemTitle}>- {edu.title}</Text>
                {edu.description && (
                  <Text style={styles.itemDescription}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Certifications Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Certifications</Text>
          <View style={styles.list}>
            {formData.certifications.map((cert, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemTitle}>- {cert.title}</Text>
                {cert.description && (
                  <Text style={styles.itemDescription}>{cert.description}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Achievements</Text>
          <View style={styles.list}>
            {formData.achievements.map((ach, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemTitle}>- {ach.title}</Text>
                {ach.description && (
                  <Text style={styles.itemDescription}>{ach.description}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;