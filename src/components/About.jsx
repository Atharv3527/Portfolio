import React from 'react';
import './About.css';

export const About = () => {
  const tools = [
    { name: 'React', variant: 'violet' },
    { name: 'Node.js', variant: 'mint' },
    { name: 'Express.js', variant: 'pink' },
    { name: 'Javascript', variant: 'violet' },
    { name: 'Typescript', variant: 'mint' },
    { name: 'MongoDB', variant: 'neutral' },
    { name: 'Supabase', variant: 'pink' },
    { name: 'Tailwind', variant: 'mint' },
    { name: 'Bootstrap', variant: 'violet' },
    { name: 'Git', variant: 'mint' },
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-dot-grid" />
      <div className="about-blob about-blob-top" />
      <div className="about-blob about-blob-bottom" />

      <div className="about-layout">
        <div className="about-left">
          <div className="about-photo-card">
            <div className="about-photo-frame-outline" />
            <div className="about-photo-frame">
              <img src="/profile.png.jpeg" alt="Atharv Waykar" className="about-photo" />
            </div>
          </div>
        </div>

        <div className="about-right">
          <div className="about-tag fade-up delay-0">
            <span className="about-tag-line" />
            <span>// about.me</span>
          </div>

          <div className="about-heading-wrap fade-up delay-1">
            <h2 className="about-heading-solid">About Me</h2>
          </div>

          <div className="about-divider fade-up delay-2" />

          <div className="fade-up delay-3">
            <p className="about-copy">
              I am currently pursuing my <span className="hl">B.E. in Computer Engineering</span> while
              sharpening my edge in <span className="hl">full-stack development</span>. I build digital
              products that are not only <span className="hl">functional but also intuitive</span>, with
              strong focus on architecture, performance, and experience.
            </p>
            <p className="about-copy">
              I enjoy solving practical problems with clean systems and thoughtful interfaces, and I
              approach every project with a maker mindset:
              <strong> stay curious, stay consistent, and never stop building</strong>.
            </p>
          </div>

          <div className="about-sub-label fade-up delay-4">// tech stack &amp; tools</div>
          <div className="about-pills fade-up delay-4">
            {tools.map((tool) => (
              <span key={tool.name} className={`about-pill about-pill-${tool.variant}`}>
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="about-scroll-indicator">
        <span className="about-scroll-circle">
          <span className="about-scroll-arrow" />
        </span>
        <span className="about-scroll-text">SCROLL</span>
      </div>
    </section>
  );
};
