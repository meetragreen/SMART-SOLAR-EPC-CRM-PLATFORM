import { useState } from "react";
import ApplyModal from "./ApplyModal";
import "./careers.css";

export default function OpenJobs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");

  const openModal = (title) => {
    setSelectedJob(title);
    setIsModalOpen(true);
  };

  return (
    <div className="career-page">
      <h1>Open Jobs</h1>
      <p>Build your career with us in the renewable energy sector 🌱</p>

      {/* JOB 1 */}
      <div className="job-card">
        <h3>Solar Project Engineer</h3>
        <p><strong>Location:</strong> Jetpur, Gujarat</p>
        <p><strong>Experience:</strong> 2+ Years</p>
        <button onClick={() => openModal("Solar Project Engineer")}>
          Apply Now
        </button>
      </div>

      {/* JOB 2 */}
      <div className="job-card">
        <h3>Site Supervisor</h3>
        <p><strong>Location:</strong> Jetpur, Gujarat</p>
        <p><strong>Experience:</strong> 1+ Year</p>
        <button onClick={() => openModal("Site Supervisor")}>
          Apply Now
        </button>
      </div>

      {/* JOB 3 */}
      <div className="job-card">
        <h3>Sales Executive</h3>
        <p><strong>Location:</strong> Jetpur, Gujarat</p>
        <p><strong>Experience:</strong> Fresher / Experienced</p>
        <button onClick={() => openModal("Sales Executive")}>
          Apply Now
        </button>
      </div>

      {/* APPLY MODAL */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob}
      />
    </div>
  );
}
