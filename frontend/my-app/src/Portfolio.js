import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS animations

// React Icons (Technical)
import {
  SiPython,
  SiReact,
  SiDocker,
  SiLinux,
  SiAmazonwebservices,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiFlask,
  SiNginx,
  SiApache,
  SiGnubash,
  SiOpenai
} from 'react-icons/si';

// React Icons (Interpersonal & Functional)
import {
  FaUsers,
  FaTasks,
  FaUserFriends,
  FaUserTie,
  FaHammer,
  FaHeadset,
  FaEye,
  FaPuzzlePiece,
  FaUserCheck,
  FaShieldAlt,
  FaExclamationTriangle,
  FaUserSecret,
  FaCodeBranch
} from 'react-icons/fa';

// Existing imports for images
import meImage from './me.png';
import AImg from './A.png';
import NetImg from './network.png';
import SecImg from './sec.png';
import CysaImg from './cysa.png';
import CaspImg from './CASP.png';
import PentestImg from './pentest.png';
import PcepImg from './pcep.png';

// Project images
import Project1Img from './project1.jpg';
import Project2Img from './project2.jpg';
import Resume from './CarterPerez.pdf';

function Portfolio() {
  // ============ ASK ME ANYTHING STATE ============
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const answerRef = useRef(null);


  const BACKEND_ENDPOINT = '/api/portfolio/ask_about_me';


  const handleAsk = () => {
    if (!question.trim()) return;
    setIsStreaming(true);
    setAnswer('');

    const data = {
      question: question.trim(),
      stream: true,
    };

    fetch(BACKEND_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          setIsStreaming(false);
          return res.text().then((text) => {
            console.error('Error from server:', text);
            setAnswer('An error occurred streaming the answer.');
          });
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        function readChunk() {
          reader.read().then(({ done, value }) => {
            if (done) {
              setIsStreaming(false);
              return;
            }
            const chunk = decoder.decode(value, { stream: true });
            setAnswer((prev) => prev + chunk);
            readChunk();
          });
        }
        readChunk();
      })
      .catch((err) => {
        console.error('Streaming error:', err);
        setAnswer('An error occurred streaming the answer.');
        setIsStreaming(false);
      });
  };


  const handleCopyAnswer = () => {
    if (answer) {
      navigator.clipboard.writeText(answer).catch((err) => {
        console.error('Could not copy text: ', err);
      });
    }
  };

  // ============ AOS SCROLL ANIMATION ============
  useEffect(() => {
    AOS.init({
      duration: 3000,
      easing: 'ease-in-out',
      once: false, 
    });
  }, []);

  // ============ SIDEBAR TOGGLE ============
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="portfolio-container">
      <button
        className="sidebar-toggle-fixed"
        onClick={handleToggleSidebar}
      >
        {sidebarOpen ? 'CLOSE' : 'NAVIGATION'}
      </button>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-links">
          <li>
            <a href="#projects" onClick={() => setSidebarOpen(false)}>
              Projects
            </a>
          </li>
          <li>
            <a href="#certifications" onClick={() => setSidebarOpen(false)}>
              Certifications
            </a>
          </li>
          <li>
            <a href="#skills" onClick={() => setSidebarOpen(false)}>
              Tech Stack
            </a>
          </li>
          <li>
            <a href="#blog" onClick={() => setSidebarOpen(false)}>
              Blog
            </a>
          </li>
          <li>
            <a href="#resume" onClick={() => setSidebarOpen(false)}>
              Résumé
            </a>
          </li>
          <li>
            <a href="#askme" onClick={() => setSidebarOpen(false)}>
              Ask Me Anything
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setSidebarOpen(false)}>
              Contact & Social
            </a>
          </li>
        </ul>
      </div>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title portfolio-glitch">Carter Perez Portfolio</h1>
          <p className="hero-subtitle">
            <span>Integration Technician</span> | <span>Cybersecurity Enthusiast</span>
          </p>
          <div className="hero-avatar">
            <img src={meImage} alt="Profile" className="profile-pic" />
          </div>
        </div>
      </section>

      {/* ABOUT WORK SECTION */}
      <section className="about-work fade-in" data-aos="fade-up">
        <h2 className="section-title">Where I Work</h2>
        <div className="work-details">
          <p>
            I work at SealingTech as a System Integration Technician, where I build and configure
            custom cybersecurity and defense systems. My focus is on designing secure, reliable
            environments that meet client needs and perform under demanding conditions. I handle
            system assembly, optimization, and testing to ensure everything operates smoothly and
            efficiently. With attention to detail and quality, I help deliver solutions that support
            critical operations and long-term scalability.
          </p>
          <p>
            Outside the 9-to-5, I’m constantly learning new skills—ranging from penetration testing
            labs to advanced programming. I believe in pushing the boundaries of what’s possible
            through curiosity and creative problem-solving.
          </p>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        className="projects-section fade-in"
        data-aos="fade-up"
        id="projects"
        style={{ scrollMarginTop: '80px' }}
      >
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card pulse-hover">
            <img src={Project1Img} alt="Project 1" className="project-image" />
            <div className="project-info">
              <h3>www.ProxyAuthRequired.com</h3>
              <p>
                ProxyAuthRequired.com is a centralized cybersecurity platform that merges
                AI-driven simulations, hands-on learning modules, and a robust Resource Hub to help
                users at any level sharpen their skills. It includes tools like GRC Wizard for
                compliance questions, Log Analysis for real-time practice, and scenario-based
                exercises for incident response. By combining interactive content with up-to-date
                threats and exam objectives, ProxyAuthRequired.com strives to be a single-stop
                solution for professionals, students, and educators looking to elevate their
                cybersecurity knowledge and readiness.
              </p>
              <p>
                <a
                  href="https://github.com/CarterPerez-dev/ProxyAuthRequired"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </p>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card pulse-hover">
            <img src={Project2Img} alt="Project 2" className="project-image" />
            <div className="project-info">
              <h3>CertsGamified.com</h3>
              <p>CertsGamified: A gamified platform that makes certification prep engaging and fun. Follow structured roadmaps to learn, practice, and master certifications like CompTIA. Earn XP, unlock badges, complete daily challenges, and track your progress—all in one place!...coming soon</p>
              <p>
                <a
                  href="https://github.com/CarterPerez-dev/CertGamified"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Github
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section
        className="certifications-section fade-in"
        data-aos="fade-up"
        id="certifications"
        style={{ scrollMarginTop: '80px' }}
      >
        <h2 className="section-title">Certifications</h2>
        <div className="certs-grid">
          <div className="cert-card scale-hover">
            <a href={AImg} target="_blank" rel="noopener noreferrer">
              <img src={AImg} alt="Certification A+" className="cert-image" />
            </a>
            <p>CompTIA A+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={NetImg} target="_blank" rel="noopener noreferrer">
              <img src={NetImg} alt="Certification Net+" className="cert-image" />
            </a>
            <p>CompTIA Network+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={SecImg} target="_blank" rel="noopener noreferrer">
              <img src={SecImg} alt="Certification Sec+" className="cert-image" />
            </a>
            <p>CompTIA Security+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={CysaImg} target="_blank" rel="noopener noreferrer">
              <img src={CysaImg} alt="Certification CySa+" className="cert-image" />
            </a>
            <p>CompTIA CySa+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={CaspImg} target="_blank" rel="noopener noreferrer">
              <img src={CaspImg} alt="Certification CASP+" className="cert-image" />
            </a>
            <p>CompTIA CASP+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={PentestImg} target="_blank" rel="noopener noreferrer">
              <img src={PentestImg} alt="Certification Pentest+" className="cert-image" />
            </a>
            <p>CompTIA Pentest+</p>
          </div>
          <div className="cert-card scale-hover">
            <a href={PcepImg} target="_blank" rel="noopener noreferrer">
              <img src={PcepImg} alt="Certification Python PCEP" className="cert-image" />
            </a>
            <p>Python PCEP</p>
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section
        className="skills-section fade-in"
        data-aos="fade-up"
        id="skills"
        style={{ scrollMarginTop: '80px', padding: '40px 20px' }}
      >
        <h2 className="section-title">My Tech Stack</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
          Here Are Some of My Core Competencies && Technologies:
        </p>
        <div className="skills-grid">
          {/* Interpersonal Column */}
          <div className="skills-column">
            <h3 className="skills-header">
              <FaUsers style={{ marginRight: '5px' }} />
              Interpersonal
            </h3>
            <div className="skill-card">
              <FaUserFriends />
              Team Player
            </div>
            <div className="skill-card">
              <FaUserTie />
              Leader
            </div>
            <div className="skill-card">
              <FaHammer />
              Hard Worker
            </div>
            <div className="skill-card">
              <FaHeadset />
              Customer Service
            </div>
            <div className="skill-card">
              <FaEye />
              Attention to Detail
            </div>
            <div className="skill-card">
              <FaPuzzlePiece />
              Flexible
            </div>
            <div className="skill-card">
              <FaUserCheck />
              Honesty
            </div>
          </div>

          {/* Functional Column */}
          <div className="skills-column">
            <h3 className="skills-header">
              <FaTasks style={{ marginRight: '5px' }} />
              Functional
            </h3>
            <div className="skill-card">
              <FaShieldAlt />
              Compliance
            </div>
            <div className="skill-card">
              <FaExclamationTriangle />
              Risk Management
            </div>
            <div className="skill-card">
              <FaUserSecret />
              Cyber Analyst
            </div>
            <div className="skill-card">
              <FaCodeBranch />
              DevOps
            </div>
          </div>

          {/* Technical Column */}
          <div className="skills-column">
            <h3 className="skills-header">Technical</h3>
            <div className="skill-card">
              <SiPython /> Python
            </div>
            <div className="skill-card">
              <SiJavascript /> JavaScript
            </div>
            <div className="skill-card">
              <SiDocker /> Docker
            </div>
            <div className="skill-card">
              <SiReact /> React
            </div>
            <div className="skill-card">
              <SiLinux /> Linux
            </div>
            <div className="skill-card">
              <SiAmazonwebservices /> AWS
            </div>
            <div className="skill-card">
              <SiMongodb /> MongoDB
            </div>
            <div className="skill-card">
              <SiNodedotjs /> Node.js
            </div>
            <div className="skill-card">
              <SiFlask /> Flask
            </div>
            <div className="skill-card">
              <SiNginx /> Nginx
            </div>
            <div className="skill-card">
              <SiApache /> Apache
            </div>
            <div className="skill-card">
              <SiGnubash /> Bash
            </div>
            <div className="skill-card">
              <SiOpenai /> OpenAI
            </div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section
        className="blog-section fade-in"
        data-aos="fade-up"
        id="blog"
        style={{ scrollMarginTop: '80px' }}
      >
        <h2 className="section-title">My Blog</h2>
        <div className="blog-list">
          <div className="blog-post tilt-hover">
            <h3>Building Custom Solutions with Quality at the Core</h3>
            <p>
              The blog highlights the role of a System Integration Technician at SealingTech,
              showcasing how custom defense and cybersecurity systems are designed and built to
              meet specific client needs. It dives into the process of selecting and configuring
              hardware, optimizing system performance, and ensuring quality through rigorous
              testing and ISO 9001 standards. The post also explores the importance of cable
              management, airflow, and modular design in creating reliable, scalable solutions that
              support critical operations.
            </p>
            <a
              href="https://www.sealingtech.com/2024/10/03/building-custom-solutions-with-quality-at-the-core/"
              target="_blank"
              rel="noopener noreferrer"
              className="blog-link"
            >
              Read More
            </a>
          </div>
          <div className="blog-post tilt-hover">
            <h3>Coming Soon</h3>
            <p>This blog I am currently still in the process of writing.</p>
            <a
              href="https://www.sealingtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="blog-link"
            >
              Read More
            </a>
          </div>
        </div>
      </section>

      {/* RESUME SECTION */}
      <section
        className="resume-section fade-in"
        data-aos="fade-up"
        id="resume"
        style={{ scrollMarginTop: '80px' }}
      >
        <h2 className="section-title">My Résumé</h2>
        <div className="resume-info">
          <p>View or download my detailed résumé below:</p>
          <a href={Resume} target="_blank" rel="noopener noreferrer" className="resume-link">
            Check Out My Résumé
          </a>
        </div>
      </section>

      {/* ASK ME ANYTHING SECTION */}
      <section
        className="ask-me-section fade-in"
        data-aos="fade-up"
        id="askme"
        style={{ scrollMarginTop: '80px' }}
      >
        <h2 className="section-title ask-me-glitch">Ask Me Anything</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
          Curious about my background, certifications, or hobbies? Type your question below and
          I’ll answer in real time!
        </p>
        <div className="ask-me-container">
          <input
            type="text"
            className="ask-me-input"
            value={question}
            placeholder="Enter your question here..."
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            className="ask-me-button"
            onClick={handleAsk}
            disabled={isStreaming}
            style={{ marginLeft: '10px' }}
          >
            {isStreaming ? 'Asking...' : 'Ask'}
          </button>
        </div>
        {isStreaming && (
          <p style={{ textAlign: 'center', marginTop: '10px', color: '#00fff5' }}>
            Streaming response...
          </p>
        )}
        {answer && (
          <div className="answer-output" ref={answerRef}>
            <button className="copy-button" onClick={handleCopyAnswer}>
              Copy
            </button>
            <p className="answer-text">{answer}</p>
          </div>
        )}
      </section>

      {/* CONTACT & SOCIALS SECTION */}
      <section
        className="contact-social-section fade-in"
        data-aos="fade-up"
        id="contact"
        style={{ scrollMarginTop: '80px' }}
      >
        <h2 className="section-title">Contact & Social</h2>
        <div className="contact-info">
          <p>
            Phone: <span className="accent-text">443-510-0866</span>
          </p>
          <p>
            Email:{' '}
            <a href="mailto:CarterPerez-dev@ProxyAuthRequired.com" className="accent-link">
              CarterPerez-dev@ProxyAuthRequired.com
            </a>
          </p>
        </div>
        <div className="social-links">
          <a
            href="https://github.com/CarterPerez-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/carter-perez-ProxyAuthRequired/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="portfolio-footer">
        <p>© {new Date().getFullYear()} Designed and Developed by Carter Perez - All Rights Reserved ©</p>
      </footer>
    </div>
  );
}

export default Portfolio;

