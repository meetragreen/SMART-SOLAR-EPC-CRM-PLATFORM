// src/components/Solutions.jsx
import "./solutions.css";

const items = [
  {
    title: "Residential",
    desc: "Home rooftop solar, battery storage and monitoring.",
    img: "https://res.cloudinary.com/dbnfm5a06/image/upload/w_600,q_auto/Residential_ndk409.png",
  },
  {
    title: "Commercial",
    desc: "Solar solutions for offices, retail and small factories.",
    img: "https://res.cloudinary.com/dbnfm5a06/image/upload/w_600,q_auto/Commercial_j0yhbs.png",
  },
  {
    title: "Industrial",
    desc: "Large-scale systems and energy optimisation.",
    img: "https://res.cloudinary.com/dbnfm5a06/image/upload/w_600,q_auto/Industrial_rhn6s7.png",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="solutions-section">
      <div className="solutions-container">
        <h2 className="solutions-title">Our Solutions</h2>

        <div className="solutions-grid">
          {items.map((i) => (
            <article key={i.title} className="solution-card">
              <img
                src={i.img}
                alt={i.title}
                className="solution-img"
                loading="lazy"
              />

              <h3 className="solution-name">{i.title}</h3>

              <p className="solution-desc">{i.desc}</p>

              {/* EXTERNAL LINK */}
              <a
                href="https://meetra-pricing-tool.vercel.app/"
                className="solution-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Quote →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
