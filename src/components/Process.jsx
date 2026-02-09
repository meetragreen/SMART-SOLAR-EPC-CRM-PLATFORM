import React, { useEffect, useRef, useState } from "react";
import "./process.css";

const steps = [
  {
    title: "Site Survey",
    desc: "Our experts inspect your location to evaluate sunlight exposure and structure strength."
  },
  {
    title: "System Design",
    desc: "A custom solar solution engineered for maximum efficiency and long-term savings."
  },
  {
    title: "Installation",
    desc: "Certified professionals install panels, inverters, and wiring with precision."
  },
  {
    title: "Testing & Activation",
    desc: "Performance testing, grid connection, and system activation."
  },
  {
    title: "Monitoring & Support",
    desc: "Ongoing monitoring, reports, and priority maintenance support."
  }
];

const Process = () => {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, index) => {
            setTimeout(() => {
              setActiveStep((prev) => Math.max(prev, index));
            }, index * 500);
          });
        }
      },
      { threshold: 0.35 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const progress =
    activeStep >= 0 ? ((activeStep + 1) / steps.length) * 100 : 0;

  return (
    <section className="process-section" ref={sectionRef}>
      <div className="process-container">
        <h2 className="process-title">Our Solar Installation Process</h2>
        <p className="process-subtitle">
          From planning to power generation — a seamless, transparent journey.
        </p>

        <div className="timeline-wrapper">
          <div className="timeline-line-outer">
            <div
              className="timeline-progress"
              style={{
                width: window.innerWidth > 900 ? `${progress}%` : "100%",
                height: window.innerWidth <= 900 ? `${progress}%` : "100%"
              }}
            />
          </div>

          <div className="timeline-steps">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`timeline-step ${
                  index <= activeStep ? "step-active" : ""
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div
                  className={`step-circle ${
                    index <= activeStep ? "active pulse" : ""
                  }`}
                >
                  {index + 1}
                </div>

                <div className="step-content">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
