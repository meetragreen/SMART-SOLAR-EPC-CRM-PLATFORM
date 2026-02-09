import { useEffect, useRef } from "react";
import "./CoreStrengths.css";

export default function CoreStrengths() {
  const countersRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countersRef.current.forEach((el) => {
              if (el && !el.classList.contains("counted")) {
                animateCount(el);
              }
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.querySelector(".green-footprint");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  function animateCount(element) {
    const target = parseFloat(element.dataset.target);
    const suffix = element.dataset.suffix || "";
    let count = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    function update() {
      count += increment;
      if (count < target) {
        element.innerText = Math.ceil(count) + suffix;
        requestAnimationFrame(update);
      } else {
        element.innerText = target + suffix;
        element.classList.add("counted");
      }
    }

    update();
  }

  return (
    <section className="core-wrapper">
      {/* TITLE */}
      <h2 className="core-title">Our Core Strengths</h2>

      <div className="core-content">
        {/* LEFT IMAGE */}
        <div className="core-left">
          <img
            src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1769578979/mk124_utp8rn.png"
            alt="Core Strengths"
            className="core-image"
          />
        </div>

        {/* RIGHT CARDS */}
        <div className="core-right">
          <div className="core-card lime">
            <img
              src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765657046/warranty_sxbkju.png"
              alt="Warranty"
              className="core-icon"
            />
            <div>
              <h3>Robust Warranty</h3>
              <p>30-year panel performance warranty, Up to 10-years inverter warranty, 1-year AMC.</p>
            </div>
          </div>

          <div className="core-card blue">
            <img
              src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765657045/customized_verlaf.png"
              alt="Customization"
              className="core-icon"
            />
            <div>
              <h3>Customized Solutions</h3>
              <p>Tailor-made solar systems to maximize efficiency.</p>
            </div>
          </div>

          <div className="core-card orange">
            <img
              src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765657045/subsidy_nfrqeo.png"
              alt="Subsidy"
              className="core-icon"
            />
            <div>
              <h3>Subsidy Support</h3>
              <p>End-to-end assistance for government subsidies.</p>
            </div>
          </div>

          <div className="core-card green">
            <img
              src="https://res.cloudinary.com/dbnfm5a06/image/upload/v1765657045/components_us0u1k.png"
              alt="Components"
              className="core-icon"
            />
            <div>
              <h3>Premium Components</h3>
              <p>High-quality panels and inverters from trusted brands.</p>
            </div>
          </div>
        </div>
      </div>

      {/* IMPACT SECTION */}
      <section
        className="green-footprint"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://res.cloudinary.com/dbnfm5a06/image/upload/v1765648205/bg-green_rcx6k3.png')",
        }}
      >
        <h2 className="green-title">🌱 Our Impact & Achievements</h2>

        <div className="green-grid">
          {[
            {
              v: "https://res.cloudinary.com/dbnfm5a06/video/upload/v1765659324/projects_jlqpg4.mp4",
              t: 400,
              s: "+",
              l: "Solar Projects Completed",
            },
            {
              v: "https://res.cloudinary.com/dbnfm5a06/video/upload/v1765659317/Solar_Performance_ieiwdu.mp4",
              t: 1500,
              s: " kW",
              l: "Installed Solar Capacity",
            },
            {
              v: "https://res.cloudinary.com/dbnfm5a06/video/upload/v1765659322/clients_jgwffx.mp4",
              t: 2100,
              s: "+",
              l: "CO₂ Emissions Reduced (Tons/Year)",
            },
            {
              v: "https://res.cloudinary.com/dbnfm5a06/video/upload/v1765659322/trees_c1lhyx.mp4",
              t: 2000,
              s: "+",
              l: "Trees Planted",
            },
            {
              v: "https://res.cloudinary.com/dbnfm5a06/video/upload/v1765659318/team_tuluim.mp4",
              t: 15,
              s: "+",
              l: "Skilled Team Members",
            },
            {
              v: "https://res.cloudinary.com/dbnfm5a06/video/upload/v1765659324/experience_phqkwv.mp4",
              t: 2,
              s: "+ Years",
              l: "Industry Experience",
            },
          ].map((item, i) => (
            <div className="green-box" key={i}>
              <video
                src={item.v}
                autoPlay
                loop
                muted
                playsInline
                className="green-video"
              />
              <span
                ref={(el) => (countersRef.current[i] = el)}
                data-target={item.t}
                data-suffix={item.s}
              >
                0
              </span>
              <p>{item.l}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
