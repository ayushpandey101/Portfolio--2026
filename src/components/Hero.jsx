import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { ArrowDown, Asterisk, X } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const pillRefs = useRef([]);

  const pillsConfig = [
    { id: 'mern', content: 'Full Stack Stack', type: 'rect' },
    { id: 'arrow', content: <ArrowDown size={30} strokeWidth={1.5} />, type: 'circle' },
    { id: 'btech', content: 'B.Tech, VIT Bhopal University', type: 'rect' },
    { id: 'gssoc', content: <><span className="green-dot" />GSSoC Top 2.5%</>, type: 'rect', className: 'pill-highlight' },
    { id: 'opensource', content: 'Open Source', type: 'rect' },
    { id: 'photo', content: <img src="src\assets\Profile_image.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', filter: 'grayscale(30%)' }} alt="Profile" />, type: 'circle' },
    { id: 'close', content: <Asterisk size={30} strokeWidth={1.5} />, type: 'circle' },
    { id: 'exp', content: 'Graphics Designer', type: 'rect' },
    { id: 'sih', content: "SIH '24 Internal Round Finalist ✦", type: 'rect' },
    { id: 'hackoct', content: "Top 1% HackOctoberFest'25", type: 'rect' }
  ];

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    // Grab dimensions of the container
    const cw = container.clientWidth;
    const ch = container.clientHeight;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Composite = Matter.Composite,
      Bodies = Matter.Bodies;

    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Smooth, heavy gravity
    engine.world.gravity.y = 0.8;

    // Raised groundLevel adjusted for the massive 15.8vw text so pills correctly bounce above it!
    const groundHeight = cw < 768 ? ch * 0.15 : ch * 0.27;
    const groundLevel = ch - groundHeight;

    const wallOptions = {
      isStatic: true,
      render: { visible: false },
      friction: 0.5,
      restitution: 0.1
    };

    const ground = Bodies.rectangle(cw / 2, groundLevel + 25, cw * 2, 50, wallOptions);
    const leftWall = Bodies.rectangle(-25, ch / 2, 50, ch * 2, wallOptions);
    const rightWall = Bodies.rectangle(cw + 25, ch / 2, 50, ch * 2, wallOptions);

    Composite.add(world, [ground, leftWall, rightWall]);

    // Create Pill Bodies
    const physicsBodies = [];

    pillRefs.current.forEach((el, index) => {
      if (!el) return;

      const config = pillsConfig[index];
      const rect = el.getBoundingClientRect();
      const w = rect.width > 20 ? rect.width : 120;
      const h = rect.height > 20 ? rect.height : 40;

      // Start position (randomized near top so they fall in)
      const startX = Math.random() * (cw - 200) + 100;
      const startY = -(Math.random() * 800 + 100);

      let body;
      const commonOptions = {
        restitution: 0.7, // Elastic bounce
        friction: 0.1,
        frictionAir: 0.01,
        density: config.type === 'circle' ? 0.05 : 0.01,
        render: { visible: false }
      };

      if (config.type === 'circle') {
        const radius = config.radius || (w / 2);
        body = Bodies.circle(startX, startY, radius, commonOptions);
      } else {
        body = Bodies.rectangle(startX, startY, w, h, commonOptions);
      }

      // Link body to DOM element safely
      body.plugin = body.plugin || {};
      body.plugin.domElement = el;
      physicsBodies.push(body);
    });

    Composite.add(world, physicsBodies);

    // Mouse Interaction
    const mouse = Mouse.create(container);
    // Crucial: remove all default scroll interception so the user can scroll the page natively!
    mouse.element.removeEventListener('wheel', mouse.mousewheel);
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    // Fix Mobile Scrolling by conditionally passing touch events:
    // Remove Matter's default aggressive touch handlers
    mouse.element.removeEventListener('touchstart', mouse.mousedown);
    mouse.element.removeEventListener('touchmove', mouse.mousemove);
    mouse.element.removeEventListener('touchend', mouse.mouseup);

    // Only prevent default on touch if we actually grabbed a pill!
    mouse.element.addEventListener('touchstart', (e) => {
      // Find if we touched a physics body DOM element
      const isPill = e.target.classList && e.target.classList.contains('physics-pill');
      if (isPill || mouseConstraint.body) {
        e.preventDefault(); // Stop native scroll only when dragging a physics object
        mouse.mousedown(e);
      }
    }, { passive: false });

    mouse.element.addEventListener('touchmove', (e) => {
      if (mouseConstraint.body) {
        e.preventDefault();
        mouse.mousemove(e);
      }
    }, { passive: false });

    mouse.element.addEventListener('touchend', (e) => {
      mouse.mouseup(e);
    });

    Composite.add(world, mouseConstraint);

    // Sync Loop: update DOM transforms to match physics body transforms
    let animationFrame;
    const updateDOM = () => {
      physicsBodies.forEach((body) => {
        const el = body.plugin.domElement;
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`;
        }
      });
      animationFrame = requestAnimationFrame(updateDOM);
    };

    updateDOM();

    // Start Physics Engine
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newCw = container.clientWidth;
      const newCh = container.clientHeight;
      const newGroundHeight = newCw < 768 ? newCh * 0.15 : newCh * 0.27;
      Matter.Body.setPosition(ground, { x: newCw / 2, y: newCh - newGroundHeight + 25 });
      Matter.Body.setPosition(rightWall, { x: newCw + 25, y: newCh / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="hero-dark" id="hero">

      {/* Top Navigation / Tagline Layer (Must be z-index above physics) */}
      <div className="hero-topbar">
        <a href="https://drive.google.com/file/d/1xNvlya1CJVs4ezPHQZzJSaggt4xHA30f/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="resume-pill-btn">View Resume ↗</a>
      </div>

      {/* Full Viewport Physics Render Area (Absolute overlay) */}
      <div className="scene-container" ref={sceneRef}>
        {pillsConfig.map((pill, index) => {
          let className = "physics-pill ";
          if (pill.type === 'circle') className += "pill-circle ";
          if (pill.id === 'photo') className += "pill-photo ";
          if (pill.className) className += pill.className;

          return (
            <div
              key={pill.id}
              className={className}
              ref={el => pillRefs.current[index] = el}
            >
              {pill.content}
            </div>
          );
        })}
      </div>

      {/* Massive Name Typography Layer */}
      <div className="hero-name-display">
        Ayush Pandey
      </div>

    </div>
  );
};

export default Hero;
