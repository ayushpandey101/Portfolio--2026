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
    engine.world.gravity.y = cw < 768 ? 0.6 : 0.8;

    // GROUND CALCULATION: Adjusted to be ABOVE the "Ayush Pandey" text.
    // Increased groundHeight for mobile to ensure pills sit atop the responsive name.
    const groundHeight = cw < 768 ? ch * 0.25 : ch * 0.28;
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
    const createPillBodies = () => {
      const bodies = [];
      pillRefs.current.forEach((el, index) => {
        if (!el) return;

        const config = pillsConfig[index];
        const rect = el.getBoundingClientRect();
        // Use current DOM size for physics body
        const w = rect.width;
        const h = rect.height;

        // Start position (randomized near top)
        const startX = Math.random() * (cw - 200) + 100;
        const startY = -(Math.random() * 500 + index * 100);

        const commonOptions = {
          restitution: 0.6,
          friction: 0.1,
          frictionAir: 0.02,
          density: config.type === 'circle' ? 0.05 : 0.01,
          render: { visible: false }
        };

        let body;
        if (config.type === 'circle') {
          body = Bodies.circle(startX, startY, w / 2, commonOptions);
        } else {
          body = Bodies.rectangle(startX, startY, w, h, commonOptions);
        }

        body.plugin = { domElement: el };
        bodies.push(body);
      });
      return bodies;
    };

    let physicsBodies = createPillBodies();
    Composite.add(world, physicsBodies);

    // Mouse Interaction
    const mouse = Mouse.create(container);
    mouse.element.removeEventListener('wheel', mouse.mousewheel);
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });

    // Fix Mobile Scrolling
    mouse.element.removeEventListener('touchstart', mouse.mousedown);
    mouse.element.removeEventListener('touchmove', mouse.mousemove);
    mouse.element.removeEventListener('touchend', mouse.mouseup);

    mouse.element.addEventListener('touchstart', (e) => {
      const isPill = e.target.classList && e.target.classList.contains('physics-pill');
      if (isPill) {
        // Only prevent scroll if we're actually over a pill
        e.preventDefault();
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

    // Sync Loop
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

    // Start Physics
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Resize Handling: Re-initialize or update ground
    const handleResize = () => {
      if (!container) return;
      const newCw = container.clientWidth;
      const newCh = container.clientHeight;
      const newGroundHeight = newCw < 768 ? newCh * 0.18 : newCh * 0.28;
      const newGroundLevel = newCh - newGroundHeight;

      Matter.Body.setPosition(ground, { x: newCw / 2, y: newGroundLevel + 25 });
      Matter.Body.setPosition(rightWall, { x: newCw + 25, y: newCh / 2 });

      // Optional: reposition bodies if they fall off
      physicsBodies.forEach(body => {
        if (body.position.y > newCh || body.position.x > newCw) {
          Matter.Body.setPosition(body, { x: Math.random() * newCw, y: -100 });
        }
      });
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
