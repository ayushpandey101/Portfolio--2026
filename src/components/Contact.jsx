import React from 'react';
import { Terminal, Briefcase, MessageCircle, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Initiate <span className="text-gradient">Handshake</span>
      </motion.h2>
      <motion.div 
        className="glow-line"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      ></motion.div>
      
      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            Whether you have a question about system architecture, want to collaborate on a new integration, or just want to say hi, my inbox is heavily monitored and quick to respond. 
          </p>
          
          <div className="social-links">
            <a href="#" className="social-link">
              <div className="icon-box"><Terminal size={20} /></div>
              github.com/engineer
            </a>
            <a href="#" className="social-link">
              <div className="icon-box"><Briefcase size={20} /></div>
              linkedin.com/in/engineer
            </a>
            <a href="#" className="social-link">
              <div className="icon-box"><MessageCircle size={20} /></div>
              twitter.com/engineer
            </a>
            <a href="mailto:hello@example.com" className="social-link">
              <div className="icon-box"><Mail size={20} /></div>
              hello@example.com
            </a>
          </div>
        </motion.div>
        
        <motion.form 
          className="contact-form" 
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 40 }}
        >
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input type="email" className="form-input" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <textarea className="form-input" rows="4" placeholder="Your Message" required></textarea>
          </div>
          <motion.button 
            type="submit" 
            className="btn-primary submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Transmit Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
