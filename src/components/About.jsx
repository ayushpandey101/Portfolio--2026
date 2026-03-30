import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

// ── Word-by-word scroll reveal ──
const INTRO_TEXT = "I build digital products at the intersection of design thinking and scalable engineering. Currently crafting full-stack experiences with the MERN Stack, microservices, and AI-powered interfaces.";

const ScrollRevealWord = ({ word, index, total, progress }) => {
  // Each word lights up at a specific point in the scroll range
  const start = index / total;
  const end = start + (1 / total);
  const color = useTransform(progress, [start, end], ['#333', '#ffffff']);

  return (
    <motion.span style={{ color, transition: 'color 0.1s' }} className="reveal-word">
      {word}
    </motion.span>
  );
};

const ScrollRevealParagraph = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'start 0.2']
  });

  const words = INTRO_TEXT.split(' ');

  return (
    <p className="about-intro-large" ref={containerRef}>
      {words.map((word, i) => (
        <ScrollRevealWord
          key={i}
          word={word}
          index={i}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
};

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="about-section" id="about">

      {/* Section Header */}
      <div className="about-header">
        <h2 className="about-title">
          About <span>Me</span>
        </h2>
        <div className="about-line" />
      </div>

      {/* Intro: Scroll-reveal left + Details right */}
      <div className="about-intro-row">
        <ScrollRevealParagraph />

        <motion.div
          className="about-intro-details"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="about-detail-block">
            <div className="about-detail-label">Currently</div>
            <div className="about-detail-value">
              B.Tech CS&E @ VIT Bhopal University
            </div>
          </div>
          <div className="about-detail-block">
            <div className="about-detail-label">Focus Areas</div>
            <div className="about-detail-value">
              Full-Stack Development · System Design · AI Integration · Graphics Design
            </div>
          </div>
          <div className="about-detail-block">
            <div className="about-detail-label">Connect</div>
            <div className="about-detail-value">
              <a href="mailto:sjas.ayushpandey101@gmail.com">Email</a>
              {' · '}
              <a href="https://github.com/ayushpandey101" target="_blank" rel="noreferrer">GitHub</a>
              {' · '}
              <a href="https://linkedin.com/in/ayushpandey101" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Experience & Education Cards */}
      <motion.div
        className="about-cards-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Card 1: GSSoC / Hacktoberfest */}
        <motion.div className="about-card" variants={itemVariants}>
          <span className="about-card-num">01</span>
          <span className="about-card-label">Experience</span>
          <h3 className="about-card-title">HackOctoberFest / GSSoC</h3>
          <div className="about-card-role">Open Source Contributor</div>
          <div className="about-card-meta">Jul 2025 — Oct 2025 · Remote</div>
          <div className="about-card-tags">
            <span className="about-card-tag">React</span>
            <span className="about-card-tag">Backend</span>
            <span className="about-card-tag">Performance</span>
            <span className="about-card-tag">UI/UX</span>
          </div>
          <ul className="about-card-list">
            <li>Ranked top 2.5% among 10,000+ contributors globally.</li>
            <li>Resolved 20+ complex state management issues in React codebases.</li>
            <li>Optimized rendering pipelines via lazy loading, boosting page speed by 25%.</li>
          </ul>
        </motion.div>

        {/* Card 2: LINPACK Club */}
        <motion.div className="about-card" variants={itemVariants}>
          <span className="about-card-num">02</span>
          <span className="about-card-label">Leadership</span>
          <h3 className="about-card-title">LINPACK Club</h3>
          <div className="about-card-role">Design Lead & Executive Head</div>
          <div className="about-card-meta">2023 — 2025 · VIT Bhopal</div>
          <div className="about-card-tags">
            <span className="about-card-tag">Graphics Design</span>
            <span className="about-card-tag">Branding</span>
            <span className="about-card-tag">Leadership</span>
          </div>
          <ul className="about-card-list">
            <li>Leading 20+ designers to build a consistent visual identity for the club.</li>
            <li>Orchestrated branding strategy for multiple large-scale university events.</li>
          </ul>
        </motion.div>

        {/* Card 3: Education */}
        <motion.div className="about-card" variants={itemVariants}>
          <span className="about-card-num">03</span>
          <span className="about-card-label">Education</span>
          <div className="about-edu-entry">
            <h3 className="about-card-title">VIT Bhopal University</h3>
            <div className="about-card-role">B.Tech — Computer Science & Engineering</div>
            <div className="about-card-meta">Sep 2022 — Jul 2026</div>
            <div className="about-edu-score">CGPA: 8.85 / 10.0</div>
          </div>
          <div className="about-edu-entry">
            <h3 className="about-card-title">Guru Tegh Bahadur Public School</h3>
            <div className="about-card-role">12th Standard CBSE</div>
            <div className="about-card-meta">Graduated 2021</div>
            <div className="about-edu-score">Score: 89.2%</div>
          </div>
        </motion.div>

        {/* Card 4: Stack */}
        <motion.div className="about-card" variants={itemVariants}>
          <span className="about-card-num">04</span>
          <span className="about-card-label">Stack</span>
          <h3 className="about-card-title">What I Work With</h3>
          <div className="about-card-meta" style={{ marginBottom: '1rem' }}>The tools and technologies I reach for daily.</div>
          <div className="about-card-tags" style={{ gap: '0.6rem' }}>
            <span className="about-card-tag">React.js</span>
            <span className="about-card-tag">Next.js</span>
            <span className="about-card-tag">TypeScript</span>
            <span className="about-card-tag">Node.js</span>
            <span className="about-card-tag">Express.js</span>
            <span className="about-card-tag">MongoDB</span>
            <span className="about-card-tag">MySQL</span>
            <span className="about-card-tag">Docker</span>
            <span className="about-card-tag">RabbitMQ</span>
            <span className="about-card-tag">Figma</span>
            <span className="about-card-tag">Canva</span>
            <span className="about-card-tag">Git</span>
            <span className="about-card-tag">Vercel</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Achievements Strip */}
      <motion.div
        className="about-achievements-row"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="about-achievement" variants={itemVariants}>
          <span className="about-achievement-icon">🏆</span>
          <div className="about-achievement-title">SIH'24 Internal Round Finalist</div>
          <div className="about-achievement-desc">
            Smart India Hackathon national finalist for satellite image interpolation model.
          </div>
        </motion.div>

        <motion.div className="about-achievement" variants={itemVariants}>
          <span className="about-achievement-icon">🍃</span>
          <div className="about-achievement-title">MongoDB Certified</div>
          <div className="about-achievement-desc">
            Official Associate Developer certification in MongoDB & Atlas infrastructure.
          </div>
        </motion.div>

        <motion.div className="about-achievement" variants={itemVariants}>
          <span className="about-achievement-icon">🤝</span>
          <div className="about-achievement-title">NSS-B Certified</div>
          <div className="about-achievement-desc">
            Completed 240 hours of community service and social development work.
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default About;
