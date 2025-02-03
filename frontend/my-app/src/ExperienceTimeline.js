import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './ExperienceTimeline.css';
import southriver from './southriver.png'; // (Unchanged import)

// ===== NEW ICON IMPORTS FROM 'react-icons/fc' =====
import {
  FcGraduationCap,
  FcBusiness,
  FcBusinessman,
  FcReading,
  FcCommandLine,
  FcMultipleDevices,
  FcUnlock,
  FcWiFiLogo,
  FcBriefcase,
  FcDocument,
  FcSearch,
  FcLinux,
  FcDataEncryption,
  FcIdea,
  FcSteam,
  FcNews,
  FcProcess
} from 'react-icons/fc';

/**
 * ExperienceTimeline Component
 * Displays a vertical timeline of experiences, education, certifications, and projects.
 */

const ExperienceTimeline = () => {
  // The timeline items, as you provided (with Security+ after A+, changed dates, etc.).
  // Now we have inserted one new item for "Wrote Another Blog" (key: 14) right after item 13.
  const timelineItems = [
    {
      key: 1,
      title: 'Graduated from South River High School',
      date: '2018 - 2022',
      description: `Completed high school education with a focus on science and mathematics, laying the groundwork for a future in cybersecurity.`,
      icon: 'graduation',
      imageUrl: ''
    },
    {
      key: 2,
      title: "General Manager at Jimmy John's, Annapolis, MD",
      date: '2022 - 2022',
      description: `Managed daily operations, Diagnosed Network & POS issues, supervised staff, and ensured customer satisfaction at the Annapolis, MD location.`,
      icon: 'briefcase',
      imageUrl: ''
    },
    {
      key: 3,
      title: "General Manager at Jimmy John's, Severna Park, MD",
      date: '2022 - 2024',
      description: `Promoted to oversee the Severna Park location, optimizing workflows and enhancing team performance.`,
      icon: 'briefcase',
      imageUrl: ''
    },
    {
      key: 4,
      title: 'Cybersecurity at Anne Arundel Community College',
      date: '2022 - present',
      description: `Foundational courses in cybersecurity, focusing on network security and ethical hacking.`,
      icon: 'graduation',
      imageUrl: ''
    },
    {
      key: 5,
      title: "Master's Degree in Cybersecurity at University of Maryland Global Campus",
      date: '2024 - Present',
      description: `Currently pursuing a master's degree with advanced studies in cybersecurity strategies and threat management.`,
      icon: 'graduation',
      imageUrl: ''
    },
    {
      key: 6,
      title: 'Earned CompTIA A+ Certification',
      date: 'April, 2024',
      description: `Obtained CompTIA A+ certification, validating foundational IT skills and knowledge.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 7,
      title: 'Earned CompTIA Security+ Certification',
      date: 'May, 2024',
      description: `Completed the CompTIA Security+ certification, learning the fundamentals of cybersecurity.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 8,
      title: 'Earned CompTIA Network+ Certification',
      date: 'May, 2024',
      description: `Achieved CompTIA Network+ certification, demonstrating expertise in network infrastructure and operations.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 9,
      title: 'Joined SealingTech as System Integration Technician II',
      date: '2024 - Present',
      description: `Responsible for assembling and quality assuring secure cybersecurity and defense systems, ensuring reliability and scalability.`,
      icon: 'briefcase',
      imageUrl: ''
    },
    {
      key: 10,
      title: 'Wrote a Blog',
      date: 'October, 2024',
      description: `Authored a blog for the company website detailing efficient quality assurance processes for high-stakes assembly
projects.`,
      icon: 'blog',
      imageUrl: ''
    },
    {
      key: 11,
      title: 'Earned CompTIA CySa+ Certification',
      date: 'October, 2024',
      description: `Certified in CompTIA CySa+, focusing on cybersecurity analysis and threat detection.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 12,
      title: 'Earned CompTIA Pentest+ Certification',
      date: 'Novemeber, 2024',
      description: `Achieved CompTIA Pentest+ certification, specializing in penetration testing and vulnerability assessment.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 13,
      title: 'Earned CompTIA CASP+ Certification',
      date: 'December, 2024',
      description: `Obtained CompTIA CASP+ certification, highlighting advanced cybersecurity skills and enterprise security.`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 14,
      title: 'Developed ProxyAuthRequired.com',
      date: 'December, 2024',
      description: `Developed ProxyAuthRequired.com, a centralized cybersecurity platform integrating AI-driven simulations and learning modules.`,
      icon: 'laptop-code',
      imageUrl: ''
    },
    // ===== NEW BLOG ENTRY AFTER PROXYAUTHREQUIRED.COM =====
    {
      key: 15,
      title: 'Wrote Another Blog',
      date: 'February, 2024',
      description: `Published a second blog post which outlines my journey of professional and personal growth as an Integration Technician at SealingTech. It delves into how pursuing industry certifications has not only sharpened my technical skills but also reshaped my approach to real-world challenges.`,
      icon: 'blog',
      imageUrl: ''
    },
    {
      key: 16,
      title: 'Developing CertsGamified.com',
      date: '2024 - Present',
      description: `Currently working on CertsGamified.com, a gamified platform aimed at making certification prep engaging and interactive.`,
      icon: 'laptop-code',
      imageUrl: ''
    },
    {
      key: 17,
      title: 'Pursuing CISSP and Offsec (OSCP, OSEP, OSWP) Certifications',
      date: '2024 - Present',
      description: `Working towards CISSP and Offsec certifications to further enhance expertise in information security and Penetration Testing`,
      icon: 'certificate',
      imageUrl: ''
    },
    {
      key: 18,
      title: 'Working on Next Projects',
      date: '2024 - Present',
      description: `Engaged in various upcoming projects focused on innovative cybersecurity solutions and platform development.`,
      icon: 'laptop-code',
      imageUrl: ''
    }
  ];

  /**
   * Returns the correct Fc icon based on the TIMELINE ITEM TITLE.
   * (We are ignoring the item.icon property now, because you want to map
   *  each EXACT title to a specific Fc icon.)
   */
  const getIconComponent = (title) => {
    if (title.includes('Graduated from South River High School')) {
      return <FcGraduationCap />;
    } else if (title.includes("Manager at Jimmy John's, Annapolis")) {
      return <FcBusiness />;
    } else if (title.includes("General Manager at Jimmy John's, Severna Park")) {
      return <FcBusinessman />;
    } else if (title.includes('Cybersecurity at Anne Arundel')) {
      return <FcReading />;
    } else if (title.includes("Master's Degree")) {
      return <FcCommandLine />;
    } else if (title.includes('CompTIA A+')) {
      return <FcMultipleDevices />;
    } else if (title.includes('Security+')) {
      return <FcUnlock />;
    } else if (title.includes('Network+')) {
      return <FcWiFiLogo />;
    } else if (title.includes('SealingTech')) {
      return <FcBriefcase />;
    } else if (title.includes('Launched My Blog')) {
      return <FcDocument />;
    } else if (title.includes('CySa+')) {
      return <FcSearch />;
    } else if (title.includes('Pentest+')) {
      return <FcLinux />;
    } else if (title.includes('CASP+')) {
      return <FcDataEncryption />;
    } else if (title.includes('ProxyAuthRequired.com')) {
      return <FcIdea />;
    } else if (title.includes('CertsGamified.com')) {
      return <FcSteam />;
    } else if (title.includes('Wrote Another Blog')) {
      return <FcNews />;
    } else if (title.includes('Pursuing CISSP')) {
      return <FcProcess />;
    } else if (title.includes('Working on Next Projects')) {
      return <FcProcess />;
    }
    // Default fallback:
    return <FcBriefcase />;
  };

  return (
    <section className="experience-timeline-container">
      <h2 className="timeline-heading">My Experience Timeline</h2>

      {/* TIMELINE (read-only) */}
      <VerticalTimeline>
        {timelineItems.map((item) => (
          <VerticalTimelineElement
            key={item.key}
            className={`vertical-timeline-element--${
              // We'll consider "graduation" or "education" if
              // the title includes "Graduated" or "Cybersecurity" or "Master's".
              // Otherwise default to "work." (This logic is purely cosmetic.)
              (item.title.includes('Graduated') ||
               item.title.includes('Cybersecurity at Anne Arundel') ||
               item.title.includes('Master')) ? 'education' : 'work'
            }`}
            contentStyle={{
              background: 'linear-gradient(135deg, #0e0e0e, #1a1a1a)',
              color: '#fff'
            }}
            contentArrowStyle={{ borderRight: '7px solid #1a1a1a' }}
            date={item.date}
            iconStyle={{ background: '#ff3d3d', color: '#fff' }}
            // We pass in item.title to get the correct Fc icon
            icon={getIconComponent(item.title)}
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
    </section>
  );
};

export default ExperienceTimeline;
