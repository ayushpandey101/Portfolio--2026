import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('sjas.ayushpandey101@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <motion.p 
          className="footer-top-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          LET'S GET IN TOUCH
        </motion.p>
        
        <motion.a 
          href="https://drive.google.com/file/d/1xNvlya1CJVs4ezPHQZzJSaggt4xHA30f/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill resume-btn"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          View Resume <ArrowUpRight size={16} />
        </motion.a>

        <motion.div 
          className="email-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="huge-email">sjas.ayushpandey101@gmail.com</h1>
          <button onClick={handleCopy} className="btn-pill copy-btn">
            {copied ? 'Copied!' : 'Copy Email'} <Copy size={14} />
          </button>
        </motion.div>

        <motion.div 
          className="social-pills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a href="https://linkedin.com/in/ayushpandey101" target="_blank" rel="noreferrer" className="btn-pill social-btn">
            LinkedIn
          </a>
          <a href="https://github.com/ayushpandey101" target="_blank" rel="noreferrer" className="btn-pill social-btn">
            GitHub
          </a>
          <a href="#" className="btn-pill social-btn">
            Instagram
          </a>
        </motion.div>

        <motion.div 
          className="footer-time"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {time}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
