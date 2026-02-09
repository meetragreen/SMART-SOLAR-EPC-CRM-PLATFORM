import { useState } from "react";
import ApplyModal from "./ApplyModal";
import "./careers.css";

export default function Internships() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState("");

  const openModal = (title) => {
    setSelectedInternship(title);
    setIsModalOpen(true);
  };

  return (
    <div className="career-page">
      <h1>Internships</h1>
      <p>Learn, grow, and work on real solar projects ☀️</p>

      <div className="job-card">
        <h3>Solar Design Intern</h3>
        <p><strong>Location:</strong> Jetpur, Gujarat</p>
        <p><strong>Mode:</strong> On-site</p>
        <p><strong>Duration:</strong> 3 Months</p>
        <button onClick={() => openModal("Solar Design Intern")}>
          Apply Now
        </button>
      </div>

      <div className="job-card">
        <h3>Marketing Intern</h3>
        <p><strong>Location:</strong> Remote / Jetpur Office</p>
        <p><strong>Mode:</strong> Hybrid</p>
        <p><strong>Duration:</strong> 2 Months</p>
        <button onClick={() => openModal("Marketing Intern")}>
          Apply Now
        </button>
      </div>

      <div className="job-card">
        <h3>Electrical Engineering Intern</h3>
        <p><strong>Location:</strong> Jetpur, Gujarat</p>
        <p><strong>Mode:</strong> On-site</p>
        <p><strong>Duration:</strong> 6 Months</p>
        <button onClick={() => openModal("Electrical Engineering Intern")}>
          Apply Now
        </button>
      </div>

      {/* APPLY MODAL */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedInternship}
      />
    </div>
  );
}
