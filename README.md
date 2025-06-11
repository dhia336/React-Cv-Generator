# CV Generator

A modern, responsive web application for creating professional CVs with a clean and user-friendly interface. Built with React and styled with CSS, this application allows users to create, preview, and download their CVs in PDF format.

## Features

- **User-Friendly Interface**: Clean and intuitive form design with responsive layout
- **Real-time Preview**: See your CV as you build it
- **PDF Export**: Download your CV as a professionally formatted PDF
- **Multiple Sections**: Support for various CV sections:
  - Personal Information
  - Technical Skills
  - Education
  - Certifications
  - Achievements
- **Rich Content Support**:
  - Profile picture upload
  - Multiple descriptions per item
  - GitHub profile link
  - Customizable formatting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dhia336/React-Cv-Generator.git
cd cv-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

### Hosted Version

You can access the hosted version of the application at:  
**[React CV Generator](https://react-cv-generator-eight.vercel.app/)**

## Usage

### Creating a CV

1. **Personal Information**
   - Upload a profile picture (optional)
   - Enter your full name
   - Add contact details (phone, email, location)
   - Add GitHub profile link (optional)

2. **Technical Skills**
   - Add multiple technical skills
   - Each skill can be added or removed individually

3. **Education**
   - Add educational qualifications
   - Include multiple descriptions for each qualification
   - Add or remove education entries as needed

4. **Certifications**
   - Add professional certifications
   - Include multiple descriptions for each certification
   - Add or remove certification entries as needed

5. **Achievements**
   - Add professional achievements
   - Include multiple descriptions for each achievement
   - Add or remove achievement entries as needed

### Preview and Download

- The preview updates in real-time as you make changes
- Click the "Download PDF" button to save your CV
- The PDF will maintain the formatting and layout of the preview

## Technical Details

### Project Structure

```
cv-generator/
├── src/
│   ├── components/
│   │   ├── Form.jsx
│   │   ├── PreviewPDF.jsx
│   │   ├── Navbar.jsx
│   │   └── Home.jsx
│   ├── styles/
│   │   └── form.css
│   ├── App.jsx
│   └── index.js
├── public/
│   └── index.html
└── package.json
```

### Key Components

- **Form.jsx**: Main form component for CV data input
- **PreviewPDF.jsx**: Real-time preview and PDF generation
- **Navbar.jsx**: Navigation component
- **Home.jsx**: Landing page component

### Dependencies

- React
- react-router-dom
- jspdf
- html2canvas

## Styling

The application uses custom CSS with responsive design principles:

- Mobile-first approach
- Responsive breakpoints:
  - Mobile: < 480px
  - Tablet: < 768px
  - Desktop: > 768px
- Modern color scheme
- Consistent spacing and typography

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React team for the amazing framework
- jsPDF for PDF generation capabilities