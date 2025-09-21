import React, { useEffect } from 'react';

function ParticleBackground() {
  useEffect(() => {
    const createParticles = () => {
      const container = document.getElementById('particles-container');
      if (!container) return;

      const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = `particle ${['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}`;

        const startX = Math.random() * window.innerWidth;
        const duration = 5 + Math.random() * 10; // 5-15 seconds
        const delay = Math.random() * 5; // 0-5 seconds delay

        particle.style.left = startX + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        container.appendChild(particle);

        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, (duration + delay) * 1000);
      };

      // Create initial particles
      for (let i = 0; i < 50; i++) {
        setTimeout(createParticle, Math.random() * 1000);
      }

      // Continuously create new particles
      const interval = setInterval(createParticle, 500);

      return () => clearInterval(interval);
    };

    const cleanup = createParticles();
    return cleanup;
  }, []);

  return <div id="particles-container" />;
}

export default ParticleBackground;
