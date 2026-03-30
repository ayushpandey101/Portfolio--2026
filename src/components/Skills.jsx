import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Skills.css';

const SKILLS_DATA = [
  {
    num: '01',
    tags: ['react.js', 'next.js', 'tailwindcss', 'javascript', 'css'],
    title: 'Web Development',
    desc: 'Building interactive, responsive and stunning web interfaces with modern frontend frameworks and clean styling.',
  },
  {
    num: '02',
    tags: ['MongoDB', 'MySQL'],
    title: 'DataBase',
    desc: 'Strong DataBase Management Skills and building efficient data structures.',
  },
  {
    num: '03',
    tags: ['git', 'github', 'docker'],
    title: 'CI/CD & DevOps',
    desc: 'Managing version control, collaborative workflows, and containerizing applications for seamless deployment processes.',
  },
  {
    num: '04',
    tags: ['figma', 'canva', 'photoshop'],
    title: 'Graphics Design',
    desc: 'Crafting brand identities, wireframes, and high-fidelity mockups with an eye for pixel-perfect details.',
  },
  {
    num: '05',
    tags: ['Java', 'Python'],
    title: 'Competitive Coding',
    desc: 'Strong algorithmic problem-solving skills, participating in coding contests, and building efficient data structures.',
  },
];

const Skills = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Move left exactly by (total carousel width - viewport width)
  // Total width: 10vw (padding-left) + 5 cards (45vw each) + 30vw (filler) = 265vw
  // Visible area: 100vw. Translation needed: -(265vw - 100vw) = -165vw
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-165vw"]);

  return (
    <section className="sk-scroll-target" ref={targetRef} id="skills">
      <div className="sk-sticky-container">

        <div className="sk-header">
          <h2 className="sk-title">
            Skills <span>and Tools</span>
          </h2>
          <div className="sk-line" />
        </div>

        <div className="sk-carousel-wrapper">
          <motion.div className="sk-carousel" style={{ x }}>
            {SKILLS_DATA.map((skill) => (
              <div className="sk-card" key={skill.num}>
                <div className="sk-tags">
                  {skill.tags.map(tag => (
                    <span className="sk-tag" key={tag}>{tag}</span>
                  ))}
                </div>

                <span className="sk-num">{skill.num}</span>

                <div className="sk-card-bottom">
                  <h3 className="sk-card-title">{skill.title}</h3>
                  <p className="sk-card-desc">{skill.desc}</p>
                </div>
              </div>
            ))}
            
            {/* Filler Card with Plus Pattern */}
            <div className="sk-card sk-filler" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
