import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

// Data Visualization & Timeline components
import ChartsDashboard from './ChartsDashboard';
import ExperienceTimeline from './ExperienceTimeline';

// ==================== COOL BACKGROUND CANVAS COMPONENT ====================
// We use react-tsparticles with loadFull from tsparticles-engine (which fixes the 
// "engine.checkVersion is not a function" issue in some versions).
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles-engine';

function CoolBackgroundCanvas() {
  const particlesInit = async (engine) => {
    // Optionally, inspect the engine with console.log(engine);
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        // This background will be visible behind the particles if nothing covers it.
        background: {
          color: { value: "#0d47a1" }, // Deep blue
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            // Animated array of colors for a cool effect
            value: ["#ffffff", "#ff4081", "#7c4dff"],
            animation: {
              enable: true,
              speed: 20,
              sync: true,
            },
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.7,
            random: false,
          },
          size: {
            value: { min: 1, max: 3 },
            random: true,
          },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

// ==================== PORTFOLIO COMPONENT ====================
function Portfolio() {
  // ==================== AOS SCROLL ANIMATION ====================
  useEffect(() => {
    AOS.init({
      duration: 3000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  // ==================== SIDEBAR TOGGLE ====================
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ==================== TERMINAL-STYLE CHAT (ASK ME ANYTHING) ====================
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const BACKEND_ENDPOINT = '/api/portfolio/ask_about_me';

  function fixOverlap(currentText, newChunk) {
    let overlap = '';
    const maxOverlap = Math.min(currentText.length, newChunk.length);
    for (let i = 1; i <= maxOverlap; i++) {
      const endOfCurrent = currentText.slice(-i);
      const startOfChunk = newChunk.slice(0, i);
      if (endOfCurrent === startOfChunk) {
        overlap = endOfCurrent;
      }
    }
    return currentText + newChunk.slice(overlap.length);
  }

  const handleSend = () => {
    const question = userInput.trim();
    if (!question) return;
    setIsStreaming(true);
    setUserInput('');

    const userMsg = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMsg]);

    const assistantMsg = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMsg]);

    const data = { question, stream: true };

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
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1].content =
                'An error occurred streaming the answer.';
              return updated;
            });
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
            setMessages((prev) => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;
              const oldContent = updated[lastIndex].content;
              const newContent = fixOverlap(oldContent, chunk);
              updated[lastIndex].content = newContent;
              return updated;
            });
            readChunk();
          });
        }
        readChunk();
      })
      .catch((err) => {
        console.error('Streaming error:', err);
        setIsStreaming(false);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content =
            'An error occurred streaming the answer.';
          return updated;
        });
      });
  };

  const terminalRef = useRef(null);
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    // Inline style here overrides the app.css background so the canvas shows through.
    <div className="portfolio-container" style={{ background: "transparent" }}>
      {/* Inline CSS to ensure our particle canvas is fixed and behind all content */}
      <style>{`
        #tsparticles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        .portfolio-container {
          position: relative;
          z-index: 0;
          background: transparent !important;
        }
      `}</style>

      {/* COOL BACKGROUND CANVAS */}
      <CoolBackgroundCanvas />

      {/* SIDEBAR TOGGLE BUTTON */}
      <button className="sidebar-toggle-fixed" onClick={handleToggleSidebar}>
        {sidebarOpen ? 'CLOSE' : 'NAVIGATION'}
      </button>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <ul className="sidebar-links">
          <li><a href="#askme" onClick={() => setSidebarOpen(false)}>Terminal</a></li>
          <li><a href="#projects" onClick={() => setSidebarOpen(false)}>Projects</a></li>
          <li><a href="#certifications" onClick={() => setSidebarOpen(false)}>Certifications</a></li>
          <li><a href="#skills" onClick={() => setSidebarOpen(false)}>Tech Stack</a></li>
          <li><a href="#blog" onClick={() => setSidebarOpen(false)}>Blog</a></li>
          <li><a href="#resume" onClick={() => setSidebarOpen(false)}>Résumé</a></li>
          <li><a href="#contact" onClick={() => setSidebarOpen(false)}>Contact & Social</a></li>
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

      {/* TERMINAL-STYLE ASK-ME-ANYTHING SECTION */}
      <section className="terminal-section fade-in" data-aos="fade-up" id="askme" style={{ scrollMarginTop: '80px' }}>
        <h2 className="section-title">Ask me Anything Linux Shell</h2>
        <div className="terminal-window" ref={terminalRef}>
          {messages.map((msg, idx) => {
            if (msg.role === 'user') {
              return (
                <div key={idx} className="terminal-line">
                  <span className="prompt">
                    <span className="prompt-root">root</span>
                    <span className="prompt-at">@</span>
                    <span className="prompt-colon">:</span>
                    <span className="prompt-carter">/Home/Carter</span>
                    <span className="prompt-hash">#</span>{' '}
                  </span>
                  <span className="terminal-user-text">{msg.content}</span>
                </div>
              );
            } else {
              return (
                <div key={idx} className="terminal-line">
                  <span className="terminal-output">{msg.content}</span>
                </div>
              );
            }
          })}
          {isStreaming && (
            <div className="terminal-line">
              <span className="terminal-output blinking-cursor">_</span>
            </div>
          )}
        </div>
        <div className="terminal-input-container">
          <span className="prompt">
            <span className="prompt-root">root</span>
            <span className="prompt-at">@</span>
            <span className="prompt-colon">:</span>
            <span className="prompt-carter">/Home/Carter</span>
            <span className="prompt-hash">#</span>{' '}
          </span>
          <input
            type="text"
            className="terminal-input"
            value={userInput}
            placeholder="Type your command..."
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />
        </div>
      </section>

      {/* ABOUT WORK SECTION */}
      <section className="about-work fade-in" data-aos="fade-up">
        <h2 className="section-title">Where I Work</h2>
        <div className="work-details">
          <p>
            I work at SealingTech as a System Integration Technician, where I build and configure custom cybersecurity and defense systems.
            My focus is on designing secure, reliable environments that meet client needs and perform under demanding conditions.
            I handle system assembly, optimization, and testing to ensure everything operates smoothly and efficiently.
            With attention to detail and quality, I help deliver solutions that support critical operations and long-term scalability.
          </p>
          <p>
            Outside the 9-to-5, I’m constantly learning new skills—ranging from penetration testing labs to advanced programming.
            I believe in pushing the boundaries of what’s possible through curiosity and creative problem-solving.
          </p>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE (NO ADD-FORM) */}
      <section className="fade-in" data-aos="fade-up" style={{ scrollMarginTop: '80px' }}>
        <ExperienceTimeline />
      </section>

      {/* PROJECTS SECTION */}
      <section className="projects-section fade-in" data-aos="fade-up" id="projects" style={{ scrollMarginTop: '80px' }}>
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          <div className="project-card pulse-hover">
            <img src={Project1Img} alt="Project 1" className="project-image" />
            <div className="project-info">
              <h3>www.ProxyAuthRequired.com</h3>
              <p>
                ProxyAuthRequired.com is a centralized cybersecurity platform that merges AI-driven simulations,
                hands-on learning modules, and a robust Resource Hub to help users at any level sharpen their skills.
                It includes tools like GRC Wizard for compliance questions, Log Analysis for real-time practice,
                and scenario-based exercises for incident response.
                By combining interactive content with up-to-date threats and exam objectives, ProxyAuthRequired.com strives to be a single-stop
                solution for professionals, students, and educators looking to elevate their cybersecurity knowledge and readiness.
              </p>
              <p>
                <a href="https://github.com/CarterPerez-dev/ProxyAuthRequired" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </p>
            </div>
          </div>
          <div className="project-card pulse-hover">
            <img src={Project2Img} alt="Project 2" className="project-image" />
            <div className="project-info">
              <h3>CertsGamified.com</h3>
              <p>
                CertsGamified: A gamified platform that makes certification prep engaging and fun.
                Follow structured roadmaps to learn, practice, and master certifications like CompTIA.
                Earn XP, unlock badges, complete daily challenges, and track your progress—all in one place! ...coming soon
              </p>
              <p>
                <a href="https://github.com/CarterPerez-dev/CertGamified" target="_blank" rel="noopener noreferrer">
                  View on Github
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section className="certifications-section fade-in" data-aos="fade-up" id="certifications" style={{ scrollMarginTop: '80px' }}>
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
      <section className="skills-section fade-in" data-aos="fade-up" id="skills" style={{ scrollMarginTop: '80px', padding: '40px 20px' }}>
        <h2 className="section-title">My Tech Stack</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
          Here Are Some of My Core Competencies && Technologies:
        </p>
        <div className="skills-grid">
          <div className="skills-column">
            <h3 className="skills-header">
              <FaUsers style={{ marginRight: '5px' }} /> Interpersonal
            </h3>
            <div className="skill-card"><FaUserFriends /> Team Player</div>
            <div className="skill-card"><FaUserTie /> Leader</div>
            <div className="skill-card"><FaHammer /> Hard Worker</div>
            <div className="skill-card"><FaHeadset /> Customer Service</div>
            <div className="skill-card"><FaEye /> Attention to Detail</div>
            <div className="skill-card"><FaPuzzlePiece /> Flexible</div>
            <div className="skill-card"><FaUserCheck /> Honesty</div>
          </div>
          <div className="skills-column">
            <h3 className="skills-header">
              <FaTasks style={{ marginRight: '5px' }} /> Functional
            </h3>
            <div className="skill-card"><FaShieldAlt /> Compliance</div>
            <div className="skill-card"><FaExclamationTriangle /> Risk Management</div>
            <div className="skill-card"><FaUserSecret /> Cyber Analyst</div>
            <div className="skill-card"><FaCodeBranch /> DevOps</div>
          </div>
          <div className="skills-column">
            <h3 className="skills-header">Technical</h3>
            <div className="skill-card"><SiPython /> Python</div>
            <div className="skill-card"><SiJavascript /> JavaScript</div>
            <div className="skill-card"><SiDocker /> Docker</div>
            <div className="skill-card"><SiReact /> React</div>
            <div className="skill-card"><SiLinux /> Linux</div>
            <div className="skill-card"><SiAmazonwebservices /> AWS</div>
            <div className="skill-card"><SiMongodb /> MongoDB</div>
            <div className="skill-card"><SiNodedotjs /> Node.js</div>
            <div className="skill-card"><SiFlask /> Flask</div>
            <div className="skill-card"><SiNginx /> Nginx</div>
            <div className="skill-card"><SiApache /> Apache</div>
            <div className="skill-card"><SiGnubash /> Bash</div>
            <div className="skill-card"><SiOpenai /> OpenAI</div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="blog-section fade-in" data-aos="fade-up" id="blog" style={{ scrollMarginTop: '80px' }}>
        <h2 className="section-title">My Blog</h2>
        <div className="blog-list">
          <div className="blog-post tilt-hover">
            <h3>Building Custom Solutions with Quality at the Core</h3>
            <p>
              The blog highlights the role of a System Integration Technician at SealingTech,
              showcasing how custom defense and cybersecurity systems are designed and built to meet specific client needs.
              It dives into the process of selecting and configuring hardware, optimizing system performance,
              and ensuring quality through rigorous testing and ISO 9001 standards.
              The post also explores the importance of cable management, airflow, and modular design in creating reliable, scalable solutions that support critical operations.
            </p>
            <a href="https://www.sealingtech.com/2024/10/03/building-custom-solutions-with-quality-at-the-core/" target="_blank" rel="noopener noreferrer" className="blog-link">
              Read More
            </a>
          </div>
          <div className="blog-post tilt-hover">
            <h3>Coming Soon</h3>
            <p>This blog I am currently still in the process of writing.</p>
            <a href="https://www.sealingtech.com/" target="_blank" rel="noopener noreferrer" className="blog-link">
              Read More
            </a>
          </div>
        </div>
      </section>

      {/* CHARTS DASHBOARD */}
      <section className="fade-in" data-aos="fade-up" style={{ scrollMarginTop: '80px' }}>
        <ChartsDashboard />
      </section>

      {/* RESUME SECTION */}
      <section className="resume-section fade-in" data-aos="fade-up" id="resume" style={{ scrollMarginTop: '80px' }}>
        <h2 className="section-title">My Résumé</h2>
        <div className="resume-info">
          <p>View or download my detailed résumé below:</p>
          <a href={Resume} target="_blank" rel="noopener noreferrer" className="resume-link">
            Check Out My Résumé
          </a>
        </div>
      </section>

      {/* CONTACT & SOCIALS SECTION */}
      <section className="contact-social-section fade-in" data-aos="fade-up" id="contact" style={{ scrollMarginTop: '80px' }}>
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
          <a href="https://github.com/CarterPerez-dev" target="_blank" rel="noopener noreferrer" className="social-icon">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/carter-perez-ProxyAuthRequired/" target="_blank" rel="noopener noreferrer" className="social-icon">
            LinkedIn
          </a>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="portfolio-footer">
        <p>
          © {new Date().getFullYear()} Designed and Developed by Carter Perez - All Rights Reserved ©
        </p>
      </footer>
    </div>
  );
}

export default Portfolio;
