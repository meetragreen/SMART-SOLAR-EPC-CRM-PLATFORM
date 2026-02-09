// AnimatedStats.jsx (React component)
import React, { useRef, useEffect } from "react";
import "./AnimatedStats.css";

const stats = [
  { icon: "/icons/experience.svg", value: 16, suffix: "+", label: "Years of Experience" },
  { icon: "/icons/global.svg", value: 20, suffix: "+", label: "Global Green Reach" },
  { icon: "/icons/clients.svg", value: 400, suffix: "+", label: "Happy Clients" },
  { icon: "/icons/projects.svg", value: 1000, suffix: "+", label: "Completed Projects" },
  { icon: "/icons/team.svg", value: 1400, suffix: "+", label: "Employees" },
  { icon: "/icons/trees.svg", value: 30000, suffix: "+", label: "Trees Planted" },
];

export default function AnimatedStats() {
  const countersRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countersRef.current.forEach((el, idx) => {
              animateCount(el, stats[idx].value, stats[idx].suffix);
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    const section = document.querySelector(".animated-stats");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  function animateCount(el, target, suffix) {
    let count = 0;
    const increment = target / 60;
    function update() {
      count += increment;
      if (count < target) {
        el.innerText = Math.ceil(count) + suffix;
        requestAnimationFrame(update);
      } else {
        el.innerText = target + suffix;
      }
    }
    update();
  }

  return (
    <section className="animated-stats">
      <h2>Our Green Footprint</h2>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div className="stat-box" key={i}>
            <img src={stat.icon} alt={stat.label} className="stat-icon" />
            <span
              ref={(el) => (countersRef.current[i] = el)}
              className="stat-number"
            >
              0
            </span>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
