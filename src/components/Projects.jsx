import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Importing assets
import theodoraImg from '../assets/theodoraq_light.png';
import expenseImg from '../assets/expensetracker.png';
import chatImg from '../assets/chatapp.png';
import imageGenImg from '../assets/imagegenerator.png';

import './Projects.css';

const PROJECTS = [
  {
    num: '01',
    title: 'Theodora',
    subtitle: 'AI-Powered Quiz Platform',
    desc: 'Full-stack MERN quiz platform where AI generates questions from any topic in seconds. Features OAuth auth, real-time scoring, and adaptive difficulty.',
    tags: ['Full Stack', 'Web App', 'AI'],
    tech: ['React.js', 'Node.js', 'MongoDB', 'OAuth'],
    accent: '#6366f1',
    bgGrad: 'radial-gradient(ellipse at 70% 50%, #1e1b4b 0%, #0c0c0e 60%)',
    image: theodoraImg,
    link: 'https://theodoraq.dev',
  },
  {
    num: '02',
    title: 'E-Tracking',
    subtitle: 'Personal Finance Dashboard',
    desc: 'Secure finance management system with real-time spending dashboards, category breakdowns, JWT-based auth, and multi-account linking.',
    tags: ['Full Stack', 'Dashboard', 'FinTech'],
    tech: ['React.js', 'Tailwind', 'Express.js', 'MongoDB', 'JWT'],
    accent: '#10b981',
    bgGrad: 'radial-gradient(ellipse at 70% 50%, #064e3b 0%, #0c0c0e 60%)',
    image: expenseImg,
    link: 'https://github.com/ayushpandey101/Expense-Tracker.git',
  },
  {
    num: '03',
    title: 'Image Generator',
    subtitle: 'Text-to-Image AI Tool',
    desc: 'Next.js application integrating Stability AI & DALL·E APIs to convert natural language prompts into high-fidelity images. Gallery view + download.',
    tags: ['Full Stack', 'AI', 'Next.js'],
    tech: ['Next.js', 'Express.js', 'AI API', 'Vercel'],
    accent: '#a855f7',
    bgGrad: 'radial-gradient(ellipse at 70% 50%, #3b0764 0%, #0c0c0e 60%)',
    image: imageGenImg,
    link: 'https://github.com/ayushpandey101/AI_Image_generator.git',
  },
  {
    num: '04',
    title: 'Chat Application',
    subtitle: 'Microservices Based Messaging',
    desc: 'Scalable real-time messaging platform constructed with a microservices architecture. Efficient message brokering with RabbitMQ and persistent storage via MongoDB.',
    tags: ['Microservices', 'Real-time', 'RabbitMQ'],
    tech: ['Next.js', 'MongoDB', 'Node.js', 'Express.js', 'Typescript', 'Docker', 'RabbitMQ'],
    accent: '#3b82f6',
    bgGrad: 'radial-gradient(ellipse at 70% 50%, #1e3a8a 0%, #0c0c0e 60%)',
    image: chatImg,
    link: 'https://github.com/ayushpandey101/MicroService_Chat_Application.git',
  },
];

const ProjectCard = ({ project, index, total, targetScale, progress }) => {
  const container = useRef(null);

  // Internal scroll for media entrance
  const { scrollYProgress: cardScroll } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(cardScroll, [0, 1], [1.3, 1]);
  const scale = useTransform(progress, [index * (1 / total), 1], [1, targetScale]);

  return (
    <div key={`p_${index}`} className="pr-card-container">
      <motion.a
        href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ scale, top: `calc(-5vh + ${index * 30}px)` }}
          className="pr-card"
          ref={container}
          data-cursor="Visit Project"
        >
          <div className="pr-card-bg" style={{ background: project.bgGrad }} />

          <div className="pr-card-content">
            <div className="pr-header">
              <span className="pr-num">{project.num}</span>
              <h3 className="pr-card-title">{project.title}</h3>
              <span className="pr-card-subtitle">{project.subtitle}</span>
            </div>
            <p className="pr-card-desc">{project.desc}</p>
          </div>

          <div className="pr-card-tech-column">
            <div className="pr-tech-stack">
              {project.tech.map(t => (
                <span key={t} className="pr-tech-pill"><b>{t}</b></span>
              ))}
            </div>
            <div className="pr-tags">
              {project.tags.map(t => (
                <span key={t} className="pr-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="pr-card-media">
            <motion.div style={{ scale: imageScale }} className="pr-inner-media">
              <div className="pr-browser-wrapper">
                <div className="pr-browser-header">
                  <span className="pr-dot" /> <span className="pr-dot" /> <span className="pr-dot" />
                </div>
                <img src={project.image} alt={project.title} className="pr-project-image" />
              </div>
            </motion.div>
          </div>
        </motion.a>
      </div>
  );
};

const Projects = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section className="pr-section" id="showcase" ref={container}>
      <div className="sk-header">
        <h2 className="sk-title">
          Projects <span>Showcase</span>
        </h2>
        <div className="sk-line" />
      </div>

      {PROJECTS.map((p, index) => {
        const targetScale = 1 - ((PROJECTS.length - index) * 0.04);
        return (
          <ProjectCard
            key={p.num}
            index={index}
            project={p}
            total={PROJECTS.length}
            targetScale={targetScale}
            progress={scrollYProgress}
          />
        );
      })}
    </section>
  );
};

export default Projects;
