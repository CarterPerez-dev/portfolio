// src/components/ExperienceTimeline/ExperienceTimeline.js

import React, { useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import {
  FaBriefcase,
  FaGraduationCap,
  FaPlus,
  FaLaptopCode,
  FaBlog,
  FaCertificate
} from 'react-icons/fa';
import 'react-vertical-timeline-component/style.min.css';
import './ExperienceTimeline.css';

/**
 * ExperienceTimeline Component
 * Displays a vertical timeline of experiences, education, certifications, and projects.
 * Users can add new timeline items dynamically.
 */
const ExperienceTimeline = () => {
  // Predefined timeline items based on your professional journey
  const [timelineItems, setTimelineItems] = useState([
    {
      key: 1,
      title: 'Graduated from South River High School',
      date: '2015 - 2019',
      description: `Completed high school education with a focus on science and mathematics, laying the groundwork for a future in cybersecurity.`,
      icon: 'graduation',
      imageUrl: ''
    },
    {
      key: 2,
      title: 'Manager at Jimmy John\'s, Annapolis',
      date: '2019 - 2020',
      description: `Managed daily operations, supervised staff, and ensured customer satisfaction at the Annapolis location.`,
      icon: 'briefcase',
      imageUrl: ''
    },
    {
      key: 3,
      title: 'General Manager at Jimmy John\'s, Severna Park',
      date: '2020 - 2021',
      description: `Promoted to oversee the Severna Park location, optimizing workflows and enhancing team performance.`,
      icon: 'briefcase',
      imageUrl: ''
    },
    {
      key: 4,
      title: 'Studied Cybersecurity at Anne Arundel Community College',
      date: '2021 - 2022',
      description: `Pursued foundational courses in cybersecurity, focusing on network security and ethical hacking.`,
      icon: 'graduation',
      imageUrl: ''
    },
    {
      key: 5,
      title: 'Master\'s Degree in Cybersecurity at University of Maryland Global Campus',
      date: '2022 - Present',
      description: `Currently pursuing a master's degree with advanced studies in cybersecurity strategies and threat management.`,
      icon: 'graduation',
      imageUrl: ''
    },
    {
      key: 6,
      title: 'Earned CompTIA A+ Certification',
      date: '2021',
      description: `Obtained CompTIA A+ certification, validating foundational IT skills and knowledge.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 7,
      title: 'Earned CompTIA Network+ Certification',
      date: '2022',
      description: `Achieved CompTIA Network+ certification, demonstrating expertise in network infrastructure and operations.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 8,
      title: 'Joined SealingTech as System Integration Technician',
      date: '2022 - Present',
      description: `Responsible for designing and configuring secure cybersecurity and defense systems, ensuring reliability and scalability.`,
      icon: 'briefcase',
      imageUrl: ''
    },
    {
      key: 9,
      title: 'Launched My Blog',
      date: '2023',
      description: `Started a personal blog to share insights on cybersecurity, technology trends, and professional experiences.`,
      icon: 'blog',
      imageUrl: ''
    },
    {
      key: 10,
      title: 'Earned CompTIA CySa+ Certification',
      date: '2023',
      description: `Certified in CompTIA CySa+, focusing on cybersecurity analysis and threat detection.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 11,
      title: 'Earned CompTIA Pentest+ Certification',
      date: '2023',
      description: `Achieved CompTIA Pentest+ certification, specializing in penetration testing and vulnerability assessment.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 12,
      title: 'Earned CompTIA CASP+ Certification',
      date: '2024',
      description: `Obtained CompTIA CASP+ certification, highlighting advanced cybersecurity skills and enterprise security.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 13,
      title: 'Created ProxyAuthRequired.com',
      date: '2024',
      description: `Developed ProxyAuthRequired.com, a centralized cybersecurity platform integrating AI-driven simulations and learning modules.`,
      icon: 'laptop-code',
      imageUrl: 'https://yourimageurl.com/proxyauthrequired.png' // Replace with your actual image URL
    },
    {
      key: 14,
      title: 'Developing CertsGamified.com',
      date: '2024 - Present',
      description: `Currently working on CertsGamified.com, a gamified platform aimed at making certification prep engaging and interactive.`,
      icon: 'laptop-code',
      imageUrl: 'https://yourimageurl.com/certsgamified.png' // Replace with your actual image URL
    },
    {
      key: 15,
      title: 'Pursuing CISSP and Offensive Security SDN Certifications',
      date: '2024 - Present',
      description: `Working towards CISSP and Offensive Security SDN certifications to further enhance expertise in information security.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 16,
      title: 'Working on Next Projects',
      date: '2024 - Present',
      description: `Engaged in various upcoming projects focused on innovative cybersecurity solutions and platform development.`,
      icon: 'laptop-code',
      imageUrl: ''
    },
  ]);

  // State for new item form
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [iconType, setIconType] = useState('briefcase');

  // Handler to add a new timeline item
  const handleAddItem = () => {
    if (!title.trim() || !date.trim() || !desc.trim()) {
      alert('Please fill in Title, Date, and Description at minimum.');
      return;
    }

    // Construct new item
    const newItem = {
      key: Date.now(),
      title: title.trim(),
      date: date.trim(),
      description: desc.trim(),
      icon: iconType,
      imageUrl: imageUrl.trim()
    };

    setTimelineItems((prev) => [...prev, newItem]);

    // Reset form
    setTitle('');
    setDate('');
    setDesc('');
    setImageUrl('');
    setIconType('briefcase');
  };

  // Helper to render the correct icon
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'graduation':
        return <FaGraduationCap />;
      case 'briefcase':
        return <FaBriefcase />;
      case 'laptop-code':
        return <FaLaptopCode />;
      case 'blog':
        return <FaBlog />;
      case 'certificate':
        return <FaCertificate />;
      default:
        return <FaBriefcase />;
    }
  };

  return (
    <section className="experience-timeline-container">
      <h2 className="timeline-heading">My Experience Timeline</h2>

      {/* TIMELINE */}
      <VerticalTimeline>
        {timelineItems.map((item) => (
          <VerticalTimelineElement
            key={item.key}
            className={`vertical-timeline-element--${item.icon === 'graduation' ? 'education' : 'work'}`}
            contentStyle={{ background: '#1a1a1a', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid #1a1a1a' }}
            date={item.date}
            iconStyle={{ background: '#ff3d3d', color: '#fff' }}
            icon={getIconComponent(item.icon)}
          >
            <h3 className="vertical-timeline-element-title">{item.title}</h3>
            <p className="vertical-timeline-element-description">
              {item.description}
            </p>
            {/* Optional Image */}
            {item.imageUrl && (
              <div className="timeline-image-container">
                <img src={item.imageUrl} alt="timeline" />
              </div>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      {/* FORM TO ADD NEW ITEM */}
      <div className="add-timeline-item-form">
        <h3>Add a New Timeline Entry</h3>
        <div className="form-row">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            placeholder="e.g. My New Job"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="text"
            value={date}
            placeholder="e.g. 2023 - Present"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="desc">Description:</label>
          <textarea
            id="desc"
            value={desc}
            placeholder="Write a short description..."
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="imageUrl">Image URL (optional):</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            placeholder="https://example.com/myimage.jpg"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="iconType">Icon Type:</label>
          <select
            id="iconType"
            value={iconType}
            onChange={(e) => setIconType(e.target.value)}
          >
            <option value="briefcase">Briefcase (Work)</option>
            <option value="graduation">Graduation Cap (Education)</option>
            <option value="certificate">Certificate</option>
            <option value="laptop-code">Laptop Code (Projects)</option>
            <option value="blog">Blog</option>
          </select>
        </div>

        <button className="add-item-button" onClick={handleAddItem}>
          <FaPlus style={{ marginRight: '5px' }} />
          Add Timeline Item
        </button>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
